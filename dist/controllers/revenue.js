"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Revenue_1 = require("../models/Revenue");
exports.default = {
    insertMultipleRevenue: async (req, res) => {
        const { revenue } = req.body;
        const { userId } = req.params;
        console.log(userId);
        let cleanedRevenue = new Revenue_1.Revenue({
            userId,
            revenue: revenue.map(ele => {
                return {
                    name: ele.name,
                    amount: ele.amount,
                    debtId: ele.debtId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const newRevenue = await cleanedRevenue.save();
        console.log(newRevenue);
        res.send(newRevenue.revenue);
    }
};
//# sourceMappingURL=revenue.js.map