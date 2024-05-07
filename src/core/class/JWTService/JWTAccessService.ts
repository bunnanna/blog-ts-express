import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { IJWTService } from './IJWTService';

export default class JWTRefreshService implements IJWTService {
	constructor(private secret: string) {
		if (!secret) throw new Error('jwt secret is undefined.');
	}

	sign: IJWTService['sign'] = (obj) => sign(obj, this.secret, { algorithm: 'RS512', expiresIn: '1m' });

	verify: IJWTService['verify'] = (token) => verify(token, this.secret) as JwtPayload;
}
