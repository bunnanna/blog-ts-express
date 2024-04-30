import { hashPassword } from "../../../utils/bcrypt";
import userRepository from "../datasources/UserRepository";
import { CreateUserEntity } from "./UserEntity";

export const register = async (createUserBody: CreateUserEntity) => {
	const { email, password, username } = createUserBody;
	await userRepository.create({
		email,
		password: hashPassword(password),
		username,
	});
};
