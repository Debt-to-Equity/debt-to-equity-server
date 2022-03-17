import argon2 from "argon2";
import validator from "email-validator";
import { Request, Response } from "express";
import { getRandomString } from "../functions/getRandomString";
// import nodemailer from 'nodemailer'
import { Users as UserModel } from "../models/User";

// let transporter = nodemailer.createTransport({
//     host: "smtp-mail.outlook.com",
//     secureConnection: false,
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'coopergoldenholt@outlook.com', // generated ethereal user
//         pass: '', // generated ethereal password
//     },
// });

export default {
  createUser: async (req: Request, res: Response) => {
    let { firstName, lastName, email, phoneNumber, typeOfUser } = req.body;
    let { userId } = req.params;
    const date = new Date();
    //@ts-ignore
    let { user } = req.session;
    const validEmail = await validator.validate(email);

    if (!validEmail) {
      return res.send("Email is Invalid");
    } else {
      email = email.toLowerCase();
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.send({ error: 401, message: "Email already in use" });
      }

      let token = getRandomString(6);

      let createdUser = new UserModel({
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
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.send({ error: 401, message: "Email or Password incorrect." });
    }
    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return res.send({ error: 401, message: "Email or Password incorrect." });
    }

    req.session!.user = {
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

    return res.send(req.session!.user);
  },
  changePassword: async (req, res) => {
    let { email, password, token, phoneNumber } = req.body;
    email = email.toLowerCase();
    token = token.toLowerCase();
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.send({ error: 401, message: "Email could not be found." });
    }

    if (user.token.string !== token) {
      return res.send({ error: 401, message: "Incorrect Token" });
    }

    // if (user.token.createdAt > user.token.createdAt.addDays('3')) {
    //     return res.sed({ error: 400, message: "Token is expired" })
    // };

    if (user.phoneNumber !== phoneNumber) {
      return res.send({ error: 401, message: "Phone Numbers do not match." });
    }

    const hashedPassword = await argon2.hash(password);

    user.password = hashedPassword;

    try {
      user.save();
    } catch {
      res.send({
        error: 500,
        message: "User could not be saved. Please try again later.",
      });
    }

    req.session!.user = {
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
    const childUsers = await UserModel.find({ parentId: userId });

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
