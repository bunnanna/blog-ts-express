import { Prisma, User } from '@prisma/client';

export interface IPrismaWrapper {
	user: {
		create: (args: Prisma.UserCreateArgs) => Promise<User>;
	};
}
