"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Types } = mongoose_1.default;
const BudgetSchema = new Schema({
    name: String,
    amount: Number,
    userId: Types.ObjectId,
    revenue: Boolean,
    createdAt: Date,
    updatedAt: Date
});
exports.Budget = mongoose_1.default.model("Budget", BudgetSchema);
//# sourceMappingURL=Expense.js.map