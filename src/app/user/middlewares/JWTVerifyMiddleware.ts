import { IJWTService } from '@src/core/class/JWTService/IJWTService';
import { coreIdentifier } from '@src/core/di/coreIdentifier';
import { inject, injectable } from 'inversify';
import { userIdentifier } from '../di/userIdentifiers';
import IUserRepository from '../repositories/IUserRepository';
import { IJWTVwerifyMiddleware } from './IJWTVerifyMiddleware';

@injectable()
export class JWTVerifyMiddleware implements IJWTVwerifyMiddleware {
	constructor(
		@inject(userIdentifier.IUserRepository) private repository: IUserRepository,
		@inject(coreIdentifier.JWTRefreshService) private jwt: IJWTService
	) {}

	verifyRefreshToken: IJWTVwerifyMiddleware['verifyRefreshToken'] = async (req, res, next) => {
		const { refreshToken } = req.cookies;
		if (!refreshToken) return next();
		const { userId } = this.jwt.verify(refreshToken);
		console.log(userId);
		res.locals = { ...res.locals, userId };
		return next();
	};

	// verifyAccessToken: IJWTVwerifyMiddleware['verifyAccessToken'] = async (req, res, next) => {};
}
