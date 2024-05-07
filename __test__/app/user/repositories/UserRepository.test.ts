import 'reflect-metadata';

import { PrismaClient, User } from '@prisma/client';
import { UserEntity, UserEntityWithOutPassword } from '@src/app/user/entities/user';
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
				password: 'String123'
			};
			jest.spyOn(mockPrisma.user, 'create').mockResolvedValue({
				...InputData,
				updatedAt: new Date(),
				createdAt: new Date(),
				userId: '1',
				role: 'User'
			});
			const OutputData = await userRepository.create(InputData);
			expect(OutputData).toBeUndefined();
			expect(mockPrisma.user.create.call).toHaveLength(1);
		});
	});

	describe('getById', () => {
		test('should get User Data', async () => {
			const userId = '16478cbe-9741-4c96-9a0c-177c7635da74';
			const userData: UserEntityWithOutPassword = {
				username: 'string',
				email: 'string@string.com',
				updatedAt: new Date('2024-05-02T03:10:41.027Z'),
				createdAt: new Date('2024-05-02T03:10:41.027Z'),
				userId: '16478cbe-9741-4c96-9a0c-177c7635da74',
				role: 'User'
			};
			jest.spyOn(mockPrisma.user, 'findUniqueOrThrow').mockResolvedValue(userData as User);

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

	describe('getByEmail', () => {
		test('should return userData', () => {
			const email = 'string@string.com';
			const userData: UserEntity = {
				username: 'string',
				email: 'string@string.com',
				password: '$2b$12$UkOINitYv54eNgf2.4FjpOZt2sDanLg/oMOKxqhE1nqW6ErGC1PJm',
				updatedAt: new Date('2024-05-02T03:10:41.027Z'),
				createdAt: new Date('2024-05-02T03:10:41.027Z'),
				userId: '16478cbe-9741-4c96-9a0c-177c7635da74',
				role: 'User'
			};
			jest.spyOn(mockPrisma.user, 'findUniqueOrThrow').mockResolvedValue(userData);
			expect(userRepository.getByEmail(email)).resolves.toBe(userData);
		});
		test('should throw when not found', () => {
			const email = 'string@string.com';
			jest.spyOn(mockPrisma.user, 'findUniqueOrThrow').mockRejectedValue(new Error());
			expect(userRepository.getByEmail(email)).rejects.toThrow(Error);
		});
	});
});
