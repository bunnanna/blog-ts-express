import { Container } from 'inversify';
import IUserController from '../controllers/IUserController';
import UserController from '../controllers/UserController';
import { IJWTVwerifyMiddleware } from '../middlewares/IJWTVerifyMiddleware';
import { JWTVerifyMiddleware } from '../middlewares/JWTVerifyMiddleware';
import IUserRepository from '../repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import GetUserUseCase from '../usecase/GetUserUseCase/GetUserUseCase';
import { IGetUserUseCase } from '../usecase/GetUserUseCase/IGetUserUseCase';
import { ILoginUseCase } from '../usecase/LoginUseCase/ILoginUsecase';
import LoginUseCase from '../usecase/LoginUseCase/LoginUseCase';
import IRegisterUseCase from '../usecase/RegisterUseCase/IRegisterUsecase';
import RegisterUseCase from '../usecase/RegisterUseCase/RegisterUseCase';
import { userIdentifier } from './userIdentifiers';

export const configUserDI = (container: Container) => {
	container.bind<IUserRepository>(userIdentifier.IUserRepository).to(UserRepository).inSingletonScope();
	container.bind<IRegisterUseCase>(userIdentifier.IRegisterUseCase).to(RegisterUseCase).inSingletonScope();
	container.bind<IGetUserUseCase>(userIdentifier.IGetUserUseCase).to(GetUserUseCase).inSingletonScope();
	container.bind<IUserController>(userIdentifier.IUserController).to(UserController).inSingletonScope();
	container.bind<ILoginUseCase>(userIdentifier.ILoginUseCase).to(LoginUseCase).inSingletonScope();
	container
		.bind<IJWTVwerifyMiddleware>(userIdentifier.IJWTVwerifyMiddleware)
		.to(JWTVerifyMiddleware)
		.inSingletonScope();
};
