export interface IJWTService {
	sign: (obj: Object) => string;
	verify: (token: string) => Object;
}
