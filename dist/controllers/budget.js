"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Budget_1 = require("../models/Budget");
exports.default = {
    insertBudget: async (req, res) => {
        const { budget } = req.body;
        const { userId } = req.params;
        let cleanedBudget = new Budget_1.Budget({
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
                };
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const newBudget = await cleanedBudget.save();
        res.send(newBudget.budget);
    }
};
//# sourceMappingURL=budget.js.map