import { RequestHandler } from 'express';

export default class LoggerMiddleware {
  static requestLogger: RequestHandler = (req, res, next) => {
    console.log(`${req.method} ${req.url} `);
    return next();
  };
}
