"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Revenue = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Types } = mongoose_1.default;
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
exports.Revenue = mongoose_1.default.model("Revenue", RevenueSchema);
//# sourceMappingURL=Revenue.js.map