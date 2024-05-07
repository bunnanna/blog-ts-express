import { Prisma } from '@prisma/client';
import { UserEntity, UserEntityWithOutPassword } from '../entities/user';

export default interface IUserRepository {
	// getAll: () => Promise<UserEntity[]>;
	getByEmail: (email: string) => Promise<UserEntity>;
	getById: (id: string) => Promise<UserEntityWithOutPassword>;
	create: (createBody: Prisma.UserCreateInput) => Promise<void>;
	// update: (id: string, updateBody: Prisma.UserUpdateInput) => Promise<void>;
}
