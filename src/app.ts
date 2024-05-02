import { configDotenv } from "dotenv";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import LoggerMiddleware from "./core/middlewares/LoggerMiddleware";
configDotenv();
const app = express();

app.use(express.json());

app.use(LoggerMiddleware.requestLogger);
app.get("/", (req, res) => res.send("Hello World!"));

export default app;
