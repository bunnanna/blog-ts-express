import 'reflect-metadata';

import IUserRepository from '@src/app/user/repositories/IUserRepository';
import UserRepository from '@src/app/user/repositories/UserRepository';
import { IPrismaWrapper } from '@src/app/user/repositories/prismaWraper';

const MockPrisma: IPrismaWrapper = {
	user: {
		create: () => {
			throw new Error('Not Implemented Method');
		},
		findUniqueOrThrow: () => {
			throw new Error('Not Implemented Method');
		},
	},
};

describe('UserRepository', () => {
	let mockPrisma: IPrismaWrapper;
	let userRepository: IUserRepository;
	beforeAll(() => {
		mockPrisma = MockPrisma;
		userRepository = new UserRepository(mockPrisma);
	});

	describe('create', () => {
		test('should created', async () => {
			const InputData = {
				username: 'string',
				email: 'string@string.com',
				password: 'String123',
			};
			jest.spyOn(mockPrisma.user, 'create').mockImplementation();
			const OutputData = await userRepository.create(InputData);
			expect(OutputData).toBeUndefined();
		});
	});
});
