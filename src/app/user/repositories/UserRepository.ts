import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { dbIdentifier } from '../../../core/dbConnection/prisma';
import IUserRepository from './IUserRepository';
import { userSelect } from './query';

@injectable()
export default class UserRepository implements IUserRepository {
	constructor(@inject(dbIdentifier.PrismaClient) private prisma: PrismaClient) {
		console.log('User Repositoy created.');
	}

	getByEmail: IUserRepository['getByEmail'] = async () => {
		throw new Error('Not Implemented Method');
	};

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
