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
        const date = new Date();
        let cleanedDebts = new Debt_1.Debt({
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
        const userDebt = await Debt_1.Debt.findOne({ userId });
        if (!userDebt) {
            return res.send("User does not have any debts");
        }
        let totalDebt = userDebt.debts.reduce((acc, debt) => {
            acc.startingAmount += debt.startingAmount;
            acc.amountRemaining += debt.amountRemaining;
            return acc;
        }, {
            startingAmount: 0,
            amountRemaining: 0,
        });
        let cleanedDebts = userDebt.debts.map((debt) => {
            return {
                name: debt.name,
                startingAmount: debt.startingAmount,
                amountRemaining: debt.amountRemaining,
                createdAt: debt.createdAt,
                updatedAt: debt.updatedAt,
                id: debt._id,
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
        const [budget] = await Budget_1.Budget.find({ userId });
        const [revenue] = await Revenue_1.Revenue.find({ userId });
        const [debts] = await Debt_1.Debt.find({ userId });
        if (!budget || !revenue || !(debts === null || debts === void 0 ? void 0 : debts.debts)) {
            return res.send("Cannot get payoff");
        }
        let time = await getTimeToPayOff_1.getTimeToPayOff(debts.debts, budget.budget, revenue.revenue);
        return res.send(time);
    },
};
//# sourceMappingURL=debt.js.map