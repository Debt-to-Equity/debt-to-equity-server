import "reflect-metadata";
require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
const { PORT, MONGO_DB_URI } = process.env;
import userCtrl from "./controllers/user";
import expectedCtrl from "./controllers/budget";
import debtCtrl from "./controllers/debt";
import budgetCtrl from "./controllers/budget";
import revenue from "./controllers/revenue";

const main = async () => {
  const app = express();

  app.use(express.json());

  app.use(
    session({
      secret: "jhkjhkljhlkhiuihkn kjhiuh87yt7ezsxd",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: false, //cookie only works in https
      },
    })
  );

  //@ts-ignore
  const server = mongoose.connect(MONGO_DB_URI);

  app.post("/login", userCtrl.loginUser);
  app.post("/register/:userId", userCtrl.createUser);
  app.post("/password", userCtrl.changePassword);

  app.get("/payoff/:userId", debtCtrl.getPayoff);
  app.get("/debt/:userId", debtCtrl.getDebts);
  app.get("/user/children/:userId", userCtrl.getChildUsers);
  app.get("/user/budget/:userId", budgetCtrl.getBudget);

  app.post("/revenue/:userId", revenue.insertMultipleRevenue);
  app.post("/debt/:userId", debtCtrl.insertMultipleDebts);
  app.post("/budget/:userId", expectedCtrl.insertBudget);

  app.listen(PORT, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => console.log(err));
