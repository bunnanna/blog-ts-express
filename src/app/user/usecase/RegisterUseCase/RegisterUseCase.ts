import { EncryptService } from '@src/core/class/EncryptService/EncryptService';
import { coreIdentifier } from '@src/core/di/coreIdentifier';
import { inject, injectable } from 'inversify';
import { userIdentifier } from '../../di/userIdentifiers';
import { CreateUserEntity } from '../../entities/user';
import IUserRepository from '../../repositories/IUserRepository';
import IRegisterUseCase from './IRegisterUsecase';

@injectable()
export default class RegisterUseCase implements IRegisterUseCase {
	constructor(
		@inject(userIdentifier.IUserRepository) private repository: IUserRepository,
		@inject(coreIdentifier.EncryptService) private encryptService: EncryptService
	) {
		console.log('Register UserCase created.');
	}

	execute: IRegisterUseCase['execute'] = async (createUserBody: CreateUserEntity) => {
		const { email, password, username } = createUserBody;
		await this.repository.create({
			email,
			password: this.encryptService.hash(password),
			username
		});
	};
}
