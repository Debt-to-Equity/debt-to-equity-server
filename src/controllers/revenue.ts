import { Revenue as RevenueModel } from "../models/Revenue"

export default {
    insertMultipleRevenue: async (req, res) => {
        const { revenue } = req.body;
        const { userId } = req.params;

        console.log(userId)
        let cleanedRevenue = new RevenueModel({
            userId,
            revenue: revenue.map(ele => {
                return {
                    name: ele.name,
                    amount: ele.amount,
                    debtId: ele.debtId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const newRevenue = await cleanedRevenue.save();

        console.log(newRevenue);

        res.send(newRevenue.revenue);
    }
}