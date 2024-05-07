import { inject, injectable } from 'inversify';
import { userIdentifier } from '../../di/userIdentifiers';
import IUserRepository from '../../repositories/IUserRepository';
import { IGetUserUseCase } from './IGetUserUseCase';

@injectable()
export default class GetUserUseCase implements IGetUserUseCase {
	constructor(@inject(userIdentifier.IUserRepository) private userRepository: IUserRepository) {}

	execute: IGetUserUseCase['execute'] = async (userId: string) => this.userRepository.getById(userId);
}
