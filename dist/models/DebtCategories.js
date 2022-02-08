"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtCategories = exports.DebtCategoriesSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.DebtCategoriesSchema = new Schema({
    name: String,
    number: Number,
});
exports.DebtCategories = mongoose_1.default.model("DebtCategories", exports.DebtCategoriesSchema);
//# sourceMappingURL=DebtCategories.js.map