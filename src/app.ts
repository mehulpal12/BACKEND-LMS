import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware";
import authRouter from "./controllers/auth/auth.route.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  })
);
app.use(cookieParser());

// health-check
app.get("/health-check", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    messsage: "health is fine",
  });
});
app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;