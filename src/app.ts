import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import LoggerMiddleware from './core/middlewares/LoggerMiddleware';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(LoggerMiddleware.requestLogger);
app.get('/', (req, res) => res.send('Hello World!'));

export default app;
