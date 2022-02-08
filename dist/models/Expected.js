"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expected = exports.ExpectedSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Types } = mongoose_1.default;
exports.ExpectedSchema = new Schema({
    typeOfTransaction: String,
    number: Number,
    name: String,
    userId: Types.ObjectId
});
exports.Expected = mongoose_1.default.model("Expected", exports.ExpectedSchema);
//# sourceMappingURL=Expected.js.map