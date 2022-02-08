"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Types } = mongoose_1.default;
const PaymentSchema = new Schema({
    name: String,
    amount: Number,
    userId: Types.ObjectId,
    budgetId: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
});
exports.Payment = mongoose_1.default.model("Payment", PaymentSchema);
//# sourceMappingURL=Payment.js.map