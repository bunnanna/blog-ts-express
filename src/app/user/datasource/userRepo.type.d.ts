import { Prisma, User } from "@prisma/client";
import { UserEntity } from "../usecase/UserEntity";

interface IUserRepository {
	getAll: () => Promise<UserEntity[]>;
	getById: (id: User["id"]) => Promise<UserEntity>;
	create: (createBody: Prisma.UserCreateInput) => Promise<void>;
	update: (id: User["id"], updateBody: Prisma.UserUpdateInput) => Promise<void>;
}
