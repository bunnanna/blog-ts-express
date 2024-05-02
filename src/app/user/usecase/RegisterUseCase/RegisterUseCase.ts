import { hashPassword } from "../../../../core/func/bcrypt";
import { CreateUserEntity } from "../../entities/user";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IRegisterUseCase } from "./IRegisterUsecase";

export default class RegisterUseCase implements IRegisterUseCase {
	constructor(private repository: IUserRepository) {
		console.log("Register UserCase created.");
	}
	execute: IRegisterUseCase["execute"] = async (
		createUserBody: CreateUserEntity
	) => {
		const { email, password, username } = createUserBody;
		await this.repository.create({
			email,
			password: hashPassword(password),
			username,
		});
	};
}
