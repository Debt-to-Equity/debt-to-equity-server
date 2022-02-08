import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const RevenueSchema = new Schema({
    userId: Types.ObjectId,
    revenue: [{
        budgetId: Types.ObjectId,
        name: String,
        amount: Number,
        createdAt: Date,
        updatedAt: Date
    }],
    createdAt: Date,
    updatedAt: Date
});

export const Revenue = mongoose.model("Revenue", RevenueSchema);