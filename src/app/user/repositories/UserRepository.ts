import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "./IUserRepository";
import { userSelect } from "./query";

export default class UserRepository implements IUserRepository {
	constructor(private prisma: PrismaClient) {
		console.log("User Repositoy created.");
	}

	getAll: IUserRepository["getAll"] = async () => {
		return this.prisma.user.findMany({ select: userSelect });
	};

	getById: IUserRepository["getById"] = async (userId) => {
		return this.prisma.user.findUniqueOrThrow({
			select: userSelect,
			where: { userId },
		});
	};
	create: IUserRepository["create"] = async (data) => {
		await this.prisma.user.create({
			data,
		});
	};
	update: IUserRepository["update"] = async (userId, data) => {
		this.prisma.user.update({
			where: { userId },
			data,
		});
	};
}
