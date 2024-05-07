import { Prisma } from '@prisma/client';
import { UserEntityWithOutPassword } from '../entities/user';

export default interface IUserRepository {
	// getAll: () => Promise<UserEntity[]>;
	getById: (id: string) => Promise<UserEntityWithOutPassword>;
	create: (createBody: Prisma.UserCreateInput) => Promise<void>;
	// update: (id: string, updateBody: Prisma.UserUpdateInput) => Promise<void>;
}
