"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const { PORT, MONGO_DB_URI } = process.env;
const user_1 = __importDefault(require("./controllers/user"));
const budget_1 = __importDefault(require("./controllers/budget"));
const debt_1 = __importDefault(require("./controllers/debt"));
const budget_2 = __importDefault(require("./controllers/budget"));
const revenue_1 = __importDefault(require("./controllers/revenue"));
const main = async () => {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(express_session_1.default({
        secret: "jhkjhkljhlkhiuihkn kjhiuh87yt7ezsxd",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        },
    }));
    const server = mongoose_1.default.connect(MONGO_DB_URI);
    app.post("/login", user_1.default.loginUser);
    app.post("/register/:userId", user_1.default.createUser);
    app.post("/password", user_1.default.changePassword);
    app.get("/payoff/:userId", debt_1.default.getPayoff);
    app.get("/debt/:userId", debt_1.default.getDebts);
    app.get("/user/children/:userId", user_1.default.getChildUsers);
    app.get("/user/budget/:userId", budget_2.default.getBudget);
    app.post("/revenue/:userId", revenue_1.default.insertMultipleRevenue);
    app.post("/debt/:userId", debt_1.default.insertMultipleDebts);
    app.post("/budget/:userId", budget_1.default.insertBudget);
    app.listen(PORT, () => {
        console.log("server started on localhost:4000");
    });
};
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map