import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const DebtSchema = new Schema({
  userId: Types.ObjectId,
  debts: [{
    name: String,
    startingAmount: Number,
    amountRemaining: Number,
    createdAt: Date,
    updatedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
});

export const Debt = mongoose.model(
  "Debt",
  DebtSchema
);
