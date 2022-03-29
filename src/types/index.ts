import { Types } from "mongoose";

export interface IDebts {
  _id: Types.ObjectId;
  name: string;
  startingAmount: number;
  amountRemaining: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBudget {
  _id: Types.ObjectId;
  name: string;
  amount: number;
  budgetId: Types.ObjectId;
  interestRate: number;
  yearsLeft: number;
  amortized: boolean;
  startingYears: number;
  debtId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRevenune {
  _id: Types.ObjectId;
  name: string;
  amount: string;
  createdAt: Date;
  updatedAt: Date;
  budgetId: string;
}
