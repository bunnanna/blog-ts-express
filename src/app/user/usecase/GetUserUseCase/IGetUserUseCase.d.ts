import { UserEntityWithOutPassword } from '../../entities/user';

export interface IGetUserUseCase {
	execute: (userId: string) => Promise<UserEntityWithOutPassword>;
}
