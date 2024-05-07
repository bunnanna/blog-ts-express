import { LoginEntity, UserEntity } from '@src/app/user/entities/user';
import IUserRepository from '@src/app/user/repositories/IUserRepository';
import { ILoginUseCase } from '@src/app/user/usecase/LoginUseCase/ILoginUsecase';
import LoginUseCase from '@src/app/user/usecase/LoginUseCase/LoginUseCase';
import { BadRequestError } from '@src/core/class/Error';
import { IJWTService } from '@src/core/class/JWTService/IJWTService';
import { mockDeep } from 'jest-mock-extended';

describe('LoginUseCase', () => {
	let mockUserRepository: IUserRepository;
	let mockJwtService: IJWTService;
	let loginUseCase: ILoginUseCase;

	beforeAll(() => {
		mockUserRepository = mockDeep<IUserRepository>();
		mockJwtService = mockDeep<IJWTService>();
		loginUseCase = new LoginUseCase(mockUserRepository, mockJwtService);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('execute', () => {
		test('should get token', async () => {
			const loginBody: LoginEntity = {
				email: 'string@string.com',
				password: 'String123'
			};
			const userData: UserEntity = {
				username: 'string',
				email: 'string@string.com',
				password: '$2b$12$UkOINitYv54eNgf2.4FjpOZt2sDanLg/oMOKxqhE1nqW6ErGC1PJm',
				updatedAt: new Date('2024-05-02T03:10:41.027Z'),
				createdAt: new Date('2024-05-02T03:10:41.027Z'),
				userId: '16478cbe-9741-4c96-9a0c-177c7635da74',
				role: 'User'
			};
			jest.spyOn(mockUserRepository, 'getByEmail').mockResolvedValue(userData);
			const token = await loginUseCase.execute(loginBody);
			expect(token).toBeDefined();
		});

		test('should throw error', async () => {
			const loginBody: LoginEntity = {
				email: 'string@string.com',
				password: 'String1234'
			};
			const userData: UserEntity = {
				username: 'string',
				email: 'string@string.com',
				password: '$2b$12$UkOINitYv54eNgf2.4FjpOZt2sDanLg/oMOKxqhE1nqW6ErGC1PJm',
				updatedAt: new Date('2024-05-02T03:10:41.027Z'),
				createdAt: new Date('2024-05-02T03:10:41.027Z'),
				userId: '16478cbe-9741-4c96-9a0c-177c7635da74',
				role: 'User'
			};
			jest.spyOn(mockUserRepository, 'getByEmail').mockResolvedValue(userData);
			expect(loginUseCase.execute(loginBody)).rejects.toThrow(BadRequestError);
		});
	});
});
