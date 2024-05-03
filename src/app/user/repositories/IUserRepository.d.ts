import { Prisma } from '@prisma/client';

export default interface IUserRepository {
	// getAll: () => Promise<UserEntity[]>;
	// getById: (id: string) => Promise<UserEntity>;
	create: (createBody: Prisma.UserCreateInput) => Promise<void>;
	// update: (id: string, updateBody: Prisma.UserUpdateInput) => Promise<void>;
}
