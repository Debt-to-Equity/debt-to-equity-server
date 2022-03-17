"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const email_validator_1 = __importDefault(require("email-validator"));
const getRandomString_1 = require("../functions/getRandomString");
const User_1 = require("../models/User");
exports.default = {
    createUser: async (req, res) => {
        let { firstName, lastName, email, phoneNumber, typeOfUser } = req.body;
        let { userId } = req.params;
        const date = new Date();
        let { user } = req.session;
        const validEmail = await email_validator_1.default.validate(email);
        if (!validEmail) {
            return res.send("Email is Invalid");
        }
        else {
            email = email.toLowerCase();
            const existingUser = await User_1.Users.findOne({ email });
            if (existingUser) {
                return res.send({ error: 401, message: "Email already in use" });
            }
            let token = getRandomString_1.getRandomString(6);
            let createdUser = new User_1.Users({
                firstName,
                lastName,
                email,
                phoneNumber,
                password: null,
                parentId: userId,
                typeOfUser,
                address: null,
                createdAt: date,
                updatedAt: date,
                token: {
                    string: token,
                    createdAt: date,
                },
            });
            const user = await createdUser.save();
            return res.send({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                loggedIn: true,
                userType: user.typeOfUser,
                id: user._id,
                phoneNumber: user.phoneNumber,
                parentId: user.parentId,
                address: user.address,
            });
        }
    },
    loginUser: async (req, res) => {
        let { email, password } = req.body;
        email = email.toLowerCase();
        const user = await User_1.Users.findOne({ email });
        if (!user) {
            return res.send({ error: 401, message: "Email or Password incorrect." });
        }
        const valid = await argon2_1.default.verify(user.password, password);
        if (!valid) {
            return res.send({ error: 401, message: "Email or Password incorrect." });
        }
        req.session.user = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            loggedIn: true,
            userType: user.typeOfUser,
            id: user._id,
            phoneNumber: user.phoneNumber,
            parentId: user.parentId,
            address: user.address,
        };
        return res.send(req.session.user);
    },
    changePassword: async (req, res) => {
        let { email, password, token, phoneNumber } = req.body;
        email = email.toLowerCase();
        token = token.toLowerCase();
        let user = await User_1.Users.findOne({ email });
        if (!user) {
            return res.send({ error: 401, message: "Email could not be found." });
        }
        if (user.token.string !== token) {
            return res.send({ error: 401, message: "Incorrect Token" });
        }
        if (user.phoneNumber !== phoneNumber) {
            return res.send({ error: 401, message: "Phone Numbers do not match." });
        }
        const hashedPassword = await argon2_1.default.hash(password);
        user.password = hashedPassword;
        try {
            user.save();
        }
        catch (_a) {
            res.send({
                error: 500,
                message: "User could not be saved. Please try again later.",
            });
        }
        req.session.user = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            loggedIn: true,
            userType: user.typeOfUser,
            id: user._id,
            phoneNumber: user.phoneNumber,
            parentId: user.parentId,
            address: user.address,
        };
        res.send(req.session.user);
    },
    getChildUsers: async (req, res) => {
        const { userId } = req.params;
        const childUsers = await User_1.Users.find({ parentId: userId });
        const cleanedUsers = childUsers.map((user) => {
            return {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.typeOfUser,
                id: user._id,
                phoneNumber: user.phoneNumber,
                parentId: user.parentId,
                address: user.address,
            };
        });
        res.send(cleanedUsers);
    },
};
//# sourceMappingURL=user.js.map