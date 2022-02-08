"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actual = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Types } = mongoose_1.default;
const ActualSchema = new Schema({
    typeOfTransaction: String,
    name: String,
    number: Number,
    userId: Types.ObjectId,
    expectedId: String,
    createdAt: Date
});
exports.Actual = mongoose_1.default.model("Actual", ActualSchema);
//# sourceMappingURL=Actual.js.map