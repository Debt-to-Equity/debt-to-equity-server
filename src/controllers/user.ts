import { Request, Response } from 'express'
import argon2 from 'argon2';
import validator from 'email-validator'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { Users as UserModel } from '../models/User'

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'coopergoldenholt@outlook.com', // generated ethereal user
        pass: 'Colbyholt1', // generated ethereal password
    },
});

module.exports = {
    createUser: async (req: Request, res: Response) => {
        let { firstName, lastName, email, phoneNumber } = req.body;

        //@ts-ignore
        let { user } = req.session;
        const validEmail = await validator.validate(email);

        if (!validEmail) {
            res.send("Email is Invalid");
        } else {
            email = email.toLowerCase();
            const [existingUser] = await UserModel.find({ email })
            if (existingUser) {
                return res.send({ error: 401, message: "Email already in use" });
            }

            let token = crypto.randomBytes(6).toString('hex')
            console.log('token')

            let createdUser = new UserModel({
                firstName,
                lastName,
                email,
                phoneNumber,
                password: null,
                parentId: '620dab677c0082f4b08cb471',
                typeOfUser: 'client',
                address: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                token: null
            });

            const user = await createdUser.save()

            // await db.User.insertToken([createdUser.id, token, new Date()])

            // transporter.sendMail({
            //     from: "coopergoldenholt@outlook.com", // sender address
            //     to: email, // list of receivers
            //     subject:
            //         "You Have Been Invited To Register For the Debt to Equity App!", // Subject line
            //     html: `<p><b>Hello</b>  </p>
            // <p>You have been invited to register an account with Debt to Equity! Download the app in your app store and register a user with this token! ${token}
            // This token will only last 24 hours.
            // </p>`,
            // });

            res.send(user);
        }
    },
    loginUser: async (req: Request, res: Response) => {
        const db = req.app.get("db");
        let { email, password } = req.body;
        console.log('hello')
        email = email.toLowerCase();
        const [user] = await db.User.selectUserByEmail(email);
        if (!user) {
            return res.send({ error: 401, message: "Email or Password incorrect." });
        }
        const valid = await argon2.verify(user.password, password)

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
        } else res.send({ error: 401, message: "Email or Password incorrect." });

    },
    changePassword: async (req: Request, res: Response) => {
        const db = req.app.get("db");
        let { email, password, token, phoneNumber } = req.body
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

        const hashedPassword = await argon2.hash(password)
        await db.User.updatePassword([email, hashedPassword])

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

        res.send(req.session.user)
    }
}