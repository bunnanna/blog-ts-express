import { injectable } from 'inversify';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { IJWTService } from './IJWTService';

@injectable()
export default class JWTRefreshService implements IJWTService {
	constructor(private secret: string) {
		if (!secret) throw new Error('jwt secret is undefined.');
	}

	sign: IJWTService['sign'] = (obj) => sign(obj, this.secret, { algorithm: 'HS512', expiresIn: '1w' });

	verify: IJWTService['verify'] = (token) => verify(token, this.secret) as JwtPayload;
}
