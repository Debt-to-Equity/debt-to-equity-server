"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const email_validator_1 = __importDefault(require("email-validator"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = require("../models/User");
let transporter = nodemailer_1.default.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    secure: false,
    auth: {
        user: 'coopergoldenholt@outlook.com',
        pass: 'Colbyholt1',
    },
});
module.exports = {
    createUser: async (req, res) => {
        const db = req.app.get("db");
        let { firstName, lastName, email, phoneNumber } = req.body;
        let { user } = req.session;
        const validEmail = await email_validator_1.default.validate(email);
        if (!validEmail) {
            res.send("Email is Invalid");
        }
        else {
            email = email.toLowerCase();
            const [existingUser] = await User_1.Users.find({ email });
            if (existingUser) {
                return res.send({ error: 401, message: "Email already in use" });
            }
            let token = crypto_1.default.randomBytes(6).toString('hex');
            console.log('token');
            let createdUser = new User_1.Users({
                firstName,
                lastName,
                email,
                phoneNumber,
                password: null,
                parentId: '61fcd5bfce33fc3fa244e40b',
                typeOfUser: 'client',
                address: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                token: null
            });
            const user = await createdUser.save();
            res.send(user);
        }
    },
    loginUser: async (req, res) => {
        const db = req.app.get("db");
        let { email, password } = req.body;
        console.log('hello');
        email = email.toLowerCase();
        const [user] = await db.User.selectUserByEmail(email);
        if (!user) {
            return res.send({ error: 401, message: "Email or Password incorrect." });
        }
        const valid = await argon2_1.default.verify(user.password, password);
        if (valid) {
            req.session.user = {
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                loggedIn: true,
                userType: user.user_type,
                id: user.id,
                phoneNumber: user.phone_number,
                parentId: user.parent_id,
                address: user.address
            };
        }
        else
            res.send({ error: 401, message: "Email or Password incorrect." });
    },
    changePassword: async (req, res) => {
        const db = req.app.get("db");
        let { email, password, token, phoneNumber } = req.body;
        const [user] = await db.User.selectUserWithToken(email);
        if (!user) {
            return res.send({ error: 401, message: "Email could not be found." });
        }
        if (user.token !== token) {
            return res.send({ error: 401, message: "Incorrect Token" });
        }
        if (user.phoneNumber !== phoneNumber) {
            return res.send({ error: 401, message: "Phone Numbers do not match." });
        }
        const hashedPassword = await argon2_1.default.hash(password);
        await db.User.updatePassword([email, hashedPassword]);
        req.session.user = {
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            loggedIn: true,
            userType: user.user_type,
            id: user.id,
            phoneNumber: user.phone_number,
            parentId: user.parent_id,
            address: user.address
        };
        res.send(req.session.user);
    }
};
//# sourceMappingURL=user.js.map