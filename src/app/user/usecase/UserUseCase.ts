import userRepository from "../datasource/UserRepository";
import { CreateUserEntity } from "./UserEntity";

export const register = async (createUserBody: CreateUserEntity) => {
	const { email, password, username } = createUserBody;
	userRepository.create({ email, password, username });
};
