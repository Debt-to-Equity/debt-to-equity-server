import { Budget as BudgetModel } from "../models/Budget";

export default {
  insertBudget: async (req, res) => {
    const { budget } = req.body;
    const { userId } = req.params;

    const date = new Date();

    let cleanedBudget = new BudgetModel({
      userId,
      budget: budget.map((ele) => {
        return {
          name: ele.name,
          amount: ele.amortized ? null : ele.amount,
          debtId: ele.debtId === "" ? null : ele.debtId,
          amortized: ele.amortized,
          interestRate: ele.interestRate,
          yearsLeft: ele.yearsLeft,
          createdAt: date,
          updatedAt: date,
        };
      }),
      createdAt: date,
      updatedAt: date,
    });

    const newBudget = await cleanedBudget.save();

    res.send(newBudget.budget);
  },
  getBudget: async (req, res) => {
    const { userId } = req.params;
    const userBudget = await BudgetModel.findOne({ userId });

    if (!userBudget) {
      return res.send("User does not have any budget");
    }

    return res.send(userBudget.budget);
  },
};
