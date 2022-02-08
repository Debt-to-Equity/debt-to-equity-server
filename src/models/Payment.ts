import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const PaymentSchema = new Schema({
    name: String,
    amount: Number,
    userId: Types.ObjectId,
    budgetId: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
});

export const Payment = mongoose.model("Payment", PaymentSchema);