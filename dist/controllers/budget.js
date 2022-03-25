"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Budget_1 = require("../models/Budget");
exports.default = {
    insertBudget: async (req, res) => {
        const { budget } = req.body;
        const { userId } = req.params;
        const date = new Date();
        let cleanedBudget = new Budget_1.Budget({
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
        const userBudget = await Budget_1.Budget.findOne({ userId });
        if (!userBudget) {
            return res.send("User does not have any budget");
        }
        return res.send(userBudget.budget);
    },
};
//# sourceMappingURL=budget.js.map