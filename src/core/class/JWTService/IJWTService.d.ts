import { JwtPayload } from 'jsonwebtoken';

export interface IJWTService {
	sign: (obj: Object) => string;
	verify: (token: string) => JwtPayload;
}
