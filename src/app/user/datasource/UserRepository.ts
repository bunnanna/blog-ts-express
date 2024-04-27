import { PrismaClient } from "@prisma/client";
import prisma from "../../../configs/db";
import { userSelect } from "./query";
import { IUserRepository } from "./userRepo.type";

export class UserRepository implements IUserRepository {
	constructor(private prisma: PrismaClient) {}

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
		this.prisma.user.create({
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

const userRepository = new UserRepository(prisma);
export default userRepository;
