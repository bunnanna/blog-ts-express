import 'reflect-metadata';

import { EncryptService } from '@src/core/class/EncryptService/EncryptService';
import { BadRequestError } from '@src/core/class/Error';
import { IJWTService } from '@src/core/class/JWTService/IJWTService';
import { coreIdentifier } from '@src/core/di/coreIdentifier';
import { inject, injectable } from 'inversify';
import { userIdentifier } from '../../di/userIdentifiers';
import IUserRepository from '../../repositories/IUserRepository';
import { ILoginUseCase } from './ILoginUsecase';

@injectable()
export default class LoginUseCase implements ILoginUseCase {
	constructor(
		@inject(userIdentifier.IUserRepository) private repository: IUserRepository,
		@inject(coreIdentifier.JWTRefreshService) private jwt: IJWTService,
		@inject(coreIdentifier.EncryptService) private encryptService: EncryptService
	) {}

	execute: ILoginUseCase['execute'] = async (loginBody) => {
		const { email, password } = loginBody;
		const userData = await this.repository.getByEmail(email);
		if (!this.encryptService.verify(password, userData.password))
			throw new BadRequestError('invalid username or password');

		return this.jwt.sign({ userId: userData.userId });
	};
}
