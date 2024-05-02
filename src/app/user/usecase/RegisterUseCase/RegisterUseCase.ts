import { inject, injectable } from "inversify";
import { hashPassword } from "../../../../core/func/bcrypt";
import { userIdentifier } from "../../di/userIdentifiers";
import { CreateUserEntity } from "../../entities/user";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IRegisterUseCase } from "./IRegisterUsecase";

@injectable()
export default class RegisterUseCase implements IRegisterUseCase {
	constructor(
		@inject(userIdentifier.IUserRepository) private repository: IUserRepository
	) {
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
