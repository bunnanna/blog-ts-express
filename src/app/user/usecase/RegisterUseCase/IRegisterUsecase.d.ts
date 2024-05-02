import { CreateUserEntity } from "../../entities/user";

export default interface IRegisterUseCase {
	execute: (createUser: CreateUserEntity) => Promise<void>;
}
