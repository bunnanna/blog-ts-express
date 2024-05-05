import 'reflect-metadata';

import { User } from '@prisma/client';
import IUserRepository from '@src/app/user/repositories/IUserRepository';
import GetUserUseCase from '@src/app/user/usecase/GetUserUseCase/GetUserUseCase';
import { mockDeep, mockReset } from 'jest-mock-extended';

describe('GetUserUseCase', () => {
	let mockUserRepository: IUserRepository;
	let getUserUseCase: GetUserUseCase;

	beforeAll(() => {
		mockUserRepository = mockDeep<IUserRepository>();
		getUserUseCase = new GetUserUseCase(mockUserRepository);
	});

	beforeEach(() => {
		mockReset(mockUserRepository);
	});

	describe('execute', () => {
		test('should return value', async () => {
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
			jest.spyOn(mockUserRepository, 'getById').mockImplementation(async () => userData);
			const result = await getUserUseCase.execute(userId);
			expect(result).not.toBeDefined();
			expect(result).not.toHaveProperty('password');
		});
	});
});
