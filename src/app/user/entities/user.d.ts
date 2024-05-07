import { $Enums } from '@prisma/client';

export interface UserEntity {
	userId: string;
	username: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	role: $Enums.Role;
}

export interface UserEntityWithOutPassword extends Omit<UserEntity, 'password'> {}

export interface CreateUserEntity {
	username: string;
	email: string;
	password: string;
}

export interface LoginEntity {
	email: string;
	password: string;
}
