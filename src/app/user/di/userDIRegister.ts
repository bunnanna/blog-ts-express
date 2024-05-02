import { Container } from "inversify";
import { IUserController } from "../controllers/IUserController";
import UserController from "../controllers/UserController";
import { IUserRepository } from "../repositories/IUserRepository";
import UserRepository from "../repositories/UserRepository";
import { IRegisterUseCase } from "../usecase/RegisterUseCase/IRegisterUsecase";
import RegisterUseCase from "../usecase/RegisterUseCase/RegisterUseCase";
import { userIdentifier } from "./userIdentifiers";

export const configUserDI = (container: Container) => {
	container
		.bind<IUserRepository>(userIdentifier.IUserRepository)
		.to(UserRepository);
	container
		.bind<IRegisterUseCase>(userIdentifier.IRegisterUseCase)
		.to(RegisterUseCase);
	container
		.bind<IUserController>(userIdentifier.IUserController)
		.to(UserController);
};