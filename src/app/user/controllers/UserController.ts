import ControllerBaseClass from '@src/core/class/ControllerBaseClass';
import { ValidationBadRequestError } from '@src/core/class/Error';
import { validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import { userIdentifier } from '../di/userIdentifiers';
import { registerValidator } from '../middlewares/validator';
import { IGetUserUseCase } from '../usecase/GetUserUseCase/IGetUserUseCase';
import { ILoginUseCase } from '../usecase/LoginUseCase/ILoginUsecase';
import IRegisterUseCase from '../usecase/RegisterUseCase/IRegisterUsecase';
import IUserController from './IUserController';

@injectable()
export default class UserController extends ControllerBaseClass implements IUserController {
	constructor(
		@inject(userIdentifier.IRegisterUseCase) private registerUseCase: IRegisterUseCase,
		@inject(userIdentifier.IGetUserUseCase) private getUserUseCase: IGetUserUseCase,
		@inject(userIdentifier.ILoginUseCase) private loginUseCase: ILoginUseCase
	) {
		super();
		this.apply();
		console.log(`User Controller Created`);
	}

	login: IUserController['login'] = async (req, res) => {
		const loginBody = req.body;
		const token = await this.loginUseCase.execute(loginBody);
		res
			.status(200)
			.cookie('refreshToken', token, { httpOnly: true, expires: new Date(Date.now() + 1 * 7 * 24 * 60 * 60 * 1000) })
			.send('login complete');
	};

	apply: CallableFunction = () => {
		this.router.post('/', registerValidator, this.register);
		this.router.get('/:userId', this.getUser);
		this.router.post('/login', this.login);
	};

	getUser: IUserController['getUser'] = async (req, res) => {
		const { userId } = req.params;
		const user = await this.getUserUseCase.execute(userId);
		res.status(200).json(user).end();
	};

	register: IUserController['register'] = async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) throw new ValidationBadRequestError(validationErrors);
		const registerBody = req.body;
		await this.registerUseCase.execute(registerBody);
		res.status(201).json({ message: 'user created' });
	};
}
