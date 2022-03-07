"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Types } = mongoose_1.default;
const UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    parentId: Types.ObjectId,
    typeOfUser: String,
    address: {
        street: String,
        postalCode: String,
        city: String,
        province: String,
        country: String
    },
    createdAt: Date,
    updatedAt: Date,
    token: {
        string: String,
        createdAt: Date
    }
});
exports.Users = mongoose_1.default.model('user', UsersSchema);
//# sourceMappingURL=User.js.map