"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Budget_1 = require("../models/Budget");
exports.default = {
    insertExpense: async (req, res) => {
        const { expense } = req.body;
        const { userId } = req.params;
        console.log(budget);
        let cleanedBudget = expense.map(ele => {
            return new Budget_1.Budget({
                name: ele.name,
                amount: ele.value,
                revenue: ele.revenue,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        });
        const newBudget = await Budget_1.Budget.insertMany(cleanedBudget);
        console.log(newBudget);
        res.send(newBudget);
    }
};
//# sourceMappingURL=expense.js.map