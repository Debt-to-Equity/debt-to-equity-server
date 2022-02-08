import "reflect-metadata";
require("dotenv").config();
import express from "express";
import mongoose from 'mongoose'
import session from "express-session";
const { PORT, MONGO_DB_URI } = process.env;
const userCtrl = require('./controllers/user');
import expectedCtrl from './controllers/budget'
import debtCtrl from './controllers/debt'
import revenue from "./controllers/revenue";

const main = async () => {

  const app = express();

  app.use(express.json());

  app.use(
    session({
      secret: 'jhkjhkljhlkhiuihkn kjhiuh87yt7ezsxd',
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

  // const stuff = await Budget.insertMany([{ name: 'Water', amount: 400, revenue: false, createdAt: new Date(), updatedAt: new Date() }]);

  // const db = await massive({
  //   connectionString: CONNECTION_STRING,
  //   //@ts-ignore
  //   ssl: { rejectUnauthorized: false },
  // })

  // await app.set('db', db)

  app.post('/login', userCtrl.loginUser)
  app.post('/register', userCtrl.createUser)

  app.get('/payoff/:userId', debtCtrl.getPayoff)

  app.post('/revenue/:userId', revenue.insertMultipleRevenue)
  app.post('/debt/:userId', debtCtrl.insertMultipleDebts)
  app.post('/budget/:userId', expectedCtrl.insertBudget)

  app.listen(PORT, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => console.log(err));
