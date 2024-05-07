import { inject, injectable } from 'inversify';
import { userIdentifier } from '../../di/userIdentifiers';
import IUserRepository from '../../repositories/IUserRepository';
import { ILoginUseCase } from './ILoginUsecase';

@injectable()
export default class LoginUseCase implements ILoginUseCase {
	constructor(@inject(userIdentifier.IUserRepository) private repository: IUserRepository) {}

	execute: ILoginUseCase['execute'] = async () => {
		throw new Error('Not Implemented Method');
	};
}
