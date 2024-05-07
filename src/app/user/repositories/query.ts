import { Prisma } from '@prisma/client';

export default {};

export const userSelect = Prisma.validator<Prisma.UserSelect>()({
	userId: true,
	username: true,
	email: true,
	role: true,
	createdAt: true,
	updatedAt: true
});
