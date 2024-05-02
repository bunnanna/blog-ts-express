import { configDotenv } from "dotenv";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
configDotenv();
const app = express();

app.use(express.json());

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} `);
	return next();
});
app.get("/", (req, res) => res.send("Hello World!"));

export default app;
