import { checkSchema } from "express-validator";
import { CreateUserEntity } from "../entities/user";

export const registerValidator = checkSchema<keyof CreateUserEntity>({
	username: { isEmpty: false, isString: true },
	email: { isEmpty: false, isEmail: true },
	password: {
		isEmpty: false,
		isStrongPassword: {
			options: {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 0,
			},
		},
	},
});
