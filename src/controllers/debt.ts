import { Debt as DebtModel } from "../models/Debt";
import { Budget as BudgetModel } from '../models/Budget';
import { Revenue as RevenueModel } from '../models/Revenue';
import { getTimeToPayOff } from "../functions/getTimeToPayOff";

export default {
    insertMultipleDebts: async (req, res) => {
        const { debts } = req.body;
        const { userId } = req.params;

        const date = new Date()

        let cleanedDebts = new DebtModel({
            userId,
            debts: debts.map(ele => {
                return {
                    name: ele.name,
                    startingAmount: ele.amount,
                    amountRemaining: ele.amount,
                    createdAt: date,
                    updatedAt: date
                }
            }),
            createdAt: date,
            updatedAt: date
        })

        const userDebt = await cleanedDebts.save();

        res.send(userDebt.debts);
    },
    getDebts: async (req, res) => {
        let { userId } = req.params

        const [userDebt] = await DebtModel.find({ userId });
        // const [payments] = await PaymentModel.find({ userId });

        let totalDebt = userDebt.debts.reduce((acc, debt) => {
            return {
                startingAmount: acc += debt.startingAmount,
                amountRemaining: acc += debt.amountRemaining
            }
        }, 0)

        res.send({
            totalDebt,
            debts: userDebt.debts
        });
    },
    getPayoff: async (req, res) => {
        let { userId } = req.params;
        // const { expected } = req.body;

        const [budget] = await BudgetModel.find({ userId });
        const [revenue] = await RevenueModel.find({ userId });
        const [debts] = await DebtModel.find({ userId });

        // const expected = await db.Expected.getExpectedById()

        let time = await getTimeToPayOff(debts.debts, budget.budget, revenue.revenue)

        res.send(time)
    },
    // getHomeValue
}