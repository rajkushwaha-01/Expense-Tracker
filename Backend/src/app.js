import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import expenseRouter from "./routes/expense.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";
import budgetRouter from "./routes/budget.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/budget", budgetRouter);

export default app;
