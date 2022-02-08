"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debt = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Types } = mongoose_1.default;
const DebtSchema = new Schema({
    userId: Types.ObjectId,
    debts: [{
            name: String,
            amount: Number,
            createdAt: Date,
            updatedAt: Date
        }],
    createdAt: Date,
    updatedAt: Date
});
exports.Debt = mongoose_1.default.model("Debt", DebtSchema);
//# sourceMappingURL=Debt.js.map