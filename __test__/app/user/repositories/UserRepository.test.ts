import 'reflect-metadata';

import { PrismaClient } from '@prisma/client';
import IUserRepository from '@src/app/user/repositories/IUserRepository';
import UserRepository from '@src/app/user/repositories/UserRepository';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('UserRepository', () => {
	let mockPrisma: DeepMockProxy<PrismaClient>;
	let userRepository: IUserRepository;
	beforeAll(() => {
		mockPrisma = mockDeep<PrismaClient>();
		userRepository = new UserRepository(mockPrisma);
	});

	describe('create', () => {
		test('should created', async () => {
			const InputData = {
				username: 'string',
				email: 'string@string.com',
				password: 'String123',
			};
			jest.spyOn(mockPrisma.user, 'create').mockResolvedValue({
				...InputData,
				updatedAt: new Date(),
				createdAt: new Date(),
				userId: '1',
				role: 'User',
			});
			const OutputData = await userRepository.create(InputData);
			expect(OutputData).toBeUndefined();
		});
	});
});
