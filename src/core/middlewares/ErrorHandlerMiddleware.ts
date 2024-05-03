import { ErrorRequestHandler } from 'express';

export default class ErrorHandlerMiddleware {
  static handleUtilsError: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    return res.status(500).json(err);
  };
}
