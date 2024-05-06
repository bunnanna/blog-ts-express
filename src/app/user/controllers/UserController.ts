import ControllerBaseClass from '@src/core/BaseClass/ControllerBaseClass';
import { ValidationBadRequestError } from '@src/core/BaseClass/Error';
import { validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import { userIdentifier } from '../di/userIdentifiers';
import { registerValidator } from '../middlewares/validator';
import { IGetUserUseCase } from '../usecase/GetUserUseCase/IGetUserUseCase';
import IRegisterUseCase from '../usecase/RegisterUseCase/IRegisterUsecase';
import IUserController from './IUserController';

@injectable()
export default class UserController extends ControllerBaseClass implements IUserController {
	constructor(
		@inject(userIdentifier.IRegisterUseCase)
		private registerUseCase: IRegisterUseCase,
		@inject(userIdentifier.IGetUserUseCase) private getUserUseCase: IGetUserUseCase
	) {
		super();
		this.apply();
		console.log(`User Controller Created`);
	}

	apply: CallableFunction = () => {
		this.router.post('/', registerValidator, this.register);
	};

	getUser: IUserController['getUser'] = () => {
		throw new Error('Not Implemented Method');
	};

	register: IUserController['register'] = async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) throw new ValidationBadRequestError(validationErrors);
		const registerBody = req.body;
		await this.registerUseCase.execute(registerBody);
		res.status(201).json({ message: 'user created' });
	};
}
