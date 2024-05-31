import { RequestHandler } from 'express';

export interface IJWTVwerifyMiddleware {
	verifyRefreshToken: RequestHandler;
	verifyAccessToken: RequestHandler;
}
