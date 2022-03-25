import { Debt as DebtModel } from "../models/Debt";
import { Budget as BudgetModel } from "../models/Budget";
import { Revenue as RevenueModel } from "../models/Revenue";
import { getTimeToPayOff } from "../functions/getTimeToPayOff";

export default {
  insertMultipleDebts: async (req, res) => {
    const { debts } = req.body;
    const { userId } = req.params;

    const date = new Date();

    let cleanedDebts = new DebtModel({
      userId,
      debts: debts.map((ele) => {
        return {
          name: ele.name,
          startingAmount: ele.amount,
          amountRemaining: ele.amount,
          createdAt: date,
          updatedAt: date,
        };
      }),
      createdAt: date,
      updatedAt: date,
    });

    const userDebt = await cleanedDebts.save();

    res.send(userDebt.debts);
  },
  getDebts: async (req, res) => {
    let { userId } = req.params;

    const userDebt = await DebtModel.findOne({ userId });

    if (!userDebt) {
      return res.send("User does not have any debts");
    }

    let totalDebt = userDebt.debts.reduce(
      (acc, debt) => {
        acc.startingAmount += debt.startingAmount;
        acc.amountRemaining += debt.amountRemaining;
        return acc;
      },
      {
        startingAmount: 0,
        amountRemaining: 0,
      }
    );

    let cleanedDebts = userDebt.debts.map((debt) => {
      return {
        name: debt.name,
        startingAmount: debt.startingAmount,
        amountRemaining: debt.amountRemaining,
        createdAt: debt.createdAt,
        updatedAt: debt.updatedAt,
        id: debt.id,
      };
    });

    res.send({
      userId: userDebt.userId,
      totalDebt,
      debts: cleanedDebts,
    });
  },
  getPayoff: async (req, res) => {
    let { userId } = req.params;
    // const { expected } = req.body;

    const [budget] = await BudgetModel.find({ userId });
    const [revenue] = await RevenueModel.find({ userId });
    const [debts] = await DebtModel.find({ userId });

    // const expected = await db.Expected.getExpectedById()

    let time = await getTimeToPayOff(
      debts.debts,
      budget.budget,
      revenue.revenue
    );

    res.send(time);
  },
  // getHomeValue
};
