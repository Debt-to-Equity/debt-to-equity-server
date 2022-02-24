"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Debt_1 = require("../models/Debt");
const Budget_1 = require("../models/Budget");
const Revenue_1 = require("../models/Revenue");
const getTimeToPayOff_1 = require("../functions/getTimeToPayOff");
exports.default = {
    insertMultipleDebts: async (req, res) => {
        const { debts } = req.body;
        const { userId } = req.params;
        let cleanedDebts = new Debt_1.Debt({
            userId,
            debts: debts.map(ele => {
                return {
                    name: ele.name,
                    amount: ele.amount,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const userDebt = await cleanedDebts.save();
        res.send(userDebt.debts);
    },
    getPayoff: async (req, res) => {
        let { userId } = req.params;
        const [budget] = await Budget_1.Budget.find({ userId });
        const [revenue] = await Revenue_1.Revenue.find({ userId });
        const [debts] = await Debt_1.Debt.find({ userId });
        let time = await getTimeToPayOff_1.getTimeToPayOff(debts.debts, budget.budget, revenue.revenue);
        res.send(time);
    },
};
//# sourceMappingURL=debt.js.map