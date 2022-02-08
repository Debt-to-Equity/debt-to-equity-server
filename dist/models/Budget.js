"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Types } = mongoose_1.default;
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
exports.Budget = mongoose_1.default.model("Budget", BudgetSchema);
//# sourceMappingURL=Budget.js.map