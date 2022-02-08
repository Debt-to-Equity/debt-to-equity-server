import { Budget as BudgetModel } from "../models/Budget"

export default {
    insertBudget: async (req, res) => {
        const { budget } = req.body;
        const { userId } = req.params;

        let cleanedBudget = new BudgetModel({
            userId,
            budget: budget.map(ele => {
                return {
                    name: ele.name,
                    amount: ele.amortized ? null : ele.amount,
                    debtId: ele.debtId === '' ? null : ele.debtId,
                    amortized: ele.amortized,
                    interestRate: ele.interestRate,
                    yearsLeft: ele.yearsLeft,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const newBudget = await cleanedBudget.save();

        res.send(newBudget.budget);
    }
}