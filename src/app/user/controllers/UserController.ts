import ControllerBaseClass from '@src/core/class/ControllerBaseClass';
import { BadRequestError, ValidationBadRequestError } from '@src/core/class/Error';
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

	login: IUserController['login'] = async () => {
		throw new Error('Not Implemented Method');
	};

	apply: CallableFunction = () => {
		this.router.post('/', registerValidator, this.register);
		this.router.get('/:userId', this.getUser);
	};

	getUser: IUserController['getUser'] = async (req, res) => {
		const { userId } = req.params;
		if (!userId) throw new BadRequestError('BadRequest');
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
