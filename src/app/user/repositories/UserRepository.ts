import { PrismaClient } from '@prisma/client';
import { coreIdentifier } from '@src/core/di/coreIdentifier';
import { inject, injectable } from 'inversify';
import IUserRepository from './IUserRepository';
import { userSelect } from './query';

@injectable()
export default class UserRepository implements IUserRepository {
	constructor(@inject(coreIdentifier.PrismaClient) private prisma: PrismaClient) {
		console.log('User Repositoy created.');
	}

	getByEmail: IUserRepository['getByEmail'] = async (email) => this.prisma.user.findUniqueOrThrow({ where: { email } });

	// getAll: IUserRepository['getAll'] = async () => this.prisma.user.findMany({ select: userSelect });

	getById: IUserRepository['getById'] = async (userId) => {
		const userData = await this.prisma.user.findUniqueOrThrow({
			where: { userId },
			select: userSelect
		});
		return userData;
	};

	create: IUserRepository['create'] = async (data) => {
		await this.prisma.user.create({
			data
		});
	};

	// update: IUserRepository['update'] = async (userId, data) => {
	// 	this.prisma.user.update({
	// 		where: { userId },
	// 		data,
	// 	});
	// };
}
