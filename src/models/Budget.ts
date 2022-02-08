import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const BudgetSchema = new Schema({
  userId: Types.ObjectId,
  debtId: Types.ObjectId,
  budget: [{
    name: String,
    budgetId: Types.ObjectId,
    amount: Number,
    debtId: Types.ObjectId,
    amortized: Boolean,
    interestRate: Number,
    yearsLeft: Number,
    createdAt: Date,
    updatedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
});

export const Budget = mongoose.model("Budget", BudgetSchema);