import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;
export const dbIdentifier = {
	PrismaClient: Symbol.for('PrismaClient'),
};
