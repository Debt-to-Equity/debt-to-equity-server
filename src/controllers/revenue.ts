import { Revenue as RevenueModel } from "../models/Revenue";

export default {
  insertMultipleRevenue: async (req, res) => {
    const { revenue } = req.body;
    const { userId } = req.params;

    let cleanedRevenue = new RevenueModel({
      userId,
      revenue: revenue.map((ele) => {
        return {
          name: ele.name,
          amount: ele.amount,
          debtId: ele.debtId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newRevenue = await cleanedRevenue.save();

    res.send(newRevenue.revenue);
  },
  getRevenue: async (req, res) => {
    const { userId } = req.params;
    const userRevenue = await RevenueModel.findOne({ userId });

    if (!userRevenue) {
      return res.send("User does not have any budget");
    }

    return res.send(userRevenue.revenue);
  },
};
