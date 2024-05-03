import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

interface PrismaUser extends Prisma.UserDelegate<DefaultArgs> {}
export interface IPrismaWrapper {
	user: {
		create: PrismaUser['create'];
		findUniqueOrThrow: PrismaUser['findFirstOrThrow'];
	};
}
