import { configDotenv } from "dotenv";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import UserController from "./app/user/controllers/UserController";
import userRouter from "./app/user/controllers/UserRouter";
import ErrorHandlerMiddleware from "./core/middlewares/ErrorHandlerMiddleware";
import container from "./di";
configDotenv();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} `);
	return next();
});
app.get("/", (req, res) => res.send("Hello World!"));

app.use("/users", userRouter(container.resolve(UserController)));

app.use(ErrorHandlerMiddleware.handleUtilsError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
