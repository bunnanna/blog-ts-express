import { CreateUserEntity } from "../../entities/user";

export interface IRegisterUseCase {
	execute: (createUser: CreateUserEntity) => Promise<void>;
}
