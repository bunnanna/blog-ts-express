import 'reflect-metadata';

import { PrismaClient, User } from '@prisma/client';
import IUserRepository from '@src/app/user/repositories/IUserRepository';
import UserRepository from '@src/app/user/repositories/UserRepository';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

describe('UserRepository', () => {
	let mockPrisma: DeepMockProxy<PrismaClient>;
	let userRepository: IUserRepository;
	beforeAll(() => {
		mockPrisma = mockDeep<PrismaClient>();
		userRepository = new UserRepository(mockPrisma);
	});

	beforeEach(() => {
		mockReset(mockPrisma);
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
			expect(mockPrisma.user.create.call).toHaveLength(1);
		});
	});

	describe('getById', () => {
		test('should get User Data', async () => {
			const userId = '16478cbe-9741-4c96-9a0c-177c7635da74';
			const userData: User = {
				username: 'string',
				email: 'string@string.com',
				password: '',
				updatedAt: new Date('2024-05-02T03:10:41.027Z'),
				createdAt: new Date('2024-05-02T03:10:41.027Z'),
				userId: '16478cbe-9741-4c96-9a0c-177c7635da74',
				role: 'User',
			};
			jest.spyOn(mockPrisma.user, 'findUniqueOrThrow').mockResolvedValue(userData);

			const result = await userRepository.getById(userId);
			expect(result).not.toBeUndefined();
			expect(result).toEqual(userData);
		});
		test('should throw error', async () => {
			const userId = 'www';
			jest.spyOn(mockPrisma.user, 'findUniqueOrThrow').mockRejectedValue(Error('user not found'));

			expect(() => userRepository.getById(userId)).rejects.toThrow('user not found');
		});
	});
});
