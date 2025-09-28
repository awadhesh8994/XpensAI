//import express
import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

import express from "express";
import expenseRouter from "./routes/expense.route.js";
import userRouter from "./routes/user.route.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { notFount, errorHandler } from "./errors/error.js";
import connectDb from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import aiRouter from "./routes/ai.route.js";

// dotenv.config({
//   path: "../.env",
// });
// express to get app
const app = express();

console.log(process.env.OPEN_AI_KEY);

const allowedOrigins = [
  "http://localhost:5173",              // Local frontend (for dev)
  "https://xpensaai.netlify.app/"  // Deployed frontend (for production)
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

//it will parse your json
app.use(express.json());
// routes
// example of middleware
app.use("/api", authRouter);
//auth middleware
app.use(authMiddleware);

// these are routers
app.use("/api", expenseRouter);
app.use("/api", userRouter);
app.use("/api", aiRouter);

//error handle
app.use(notFount);
app.use(errorHandler);

//root handle
app.get("/", (req, resp) => {
  console.log("this is my root url");
  resp.json({
    message: "Welcome to expense backend.",
  });
});

//sever start
app.listen(8081, () => {
  console.log("Server started on port 8081");
});
