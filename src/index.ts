import { configDotenv } from "dotenv";
import express from "express";
import userRouter from "./app/user/controllers/UserController";
configDotenv();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/users", userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
