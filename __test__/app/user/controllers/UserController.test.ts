import app from '@src/app';
import UserController from '@src/app/user/controllers/UserController';
import { LoginEntity, UserEntityWithOutPassword } from '@src/app/user/entities/user';
import { IGetUserUseCase } from '@src/app/user/usecase/GetUserUseCase/IGetUserUseCase';
import { ILoginUseCase } from '@src/app/user/usecase/LoginUseCase/ILoginUsecase';
import IRegisterUseCase from '@src/app/user/usecase/RegisterUseCase/IRegisterUsecase';
import ErrorHandlerMiddleware from '@src/core/middlewares/ErrorHandlerMiddleware';
import { mockDeep } from 'jest-mock-extended';
import supertest from 'supertest';

describe('UserController', () => {
	let mockRegisterUseCase: IRegisterUseCase;
	let mockGetUserUseCase: IGetUserUseCase;
	let mockLoginUseCase: ILoginUseCase;
	beforeAll(() => {
		mockRegisterUseCase = mockDeep<IRegisterUseCase>();
		mockGetUserUseCase = mockDeep<IGetUserUseCase>();
		mockLoginUseCase = mockDeep<ILoginUseCase>();
		const controller = new UserController(mockRegisterUseCase, mockGetUserUseCase, mockLoginUseCase);
		app.use('/users', controller.router);
		app.use(ErrorHandlerMiddleware.handleUtilsError);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('register', () => {
		test('should return 201', async () => {
			const InputData = {
				username: 'string',
				email: 'string@string.com',
				password: 'String123'
			};
			jest.spyOn(mockRegisterUseCase, 'execute').mockImplementationOnce(() => Promise.resolve());
			await supertest(app).post('/users').send(InputData).expect(201).expect({ message: 'user created' });
		});

		test('should return 500', async () => {
			const InputData = {
				username: '',
				email: 'notemail',
				password: 'badpassword'
			};
			jest.spyOn(mockRegisterUseCase, 'execute').mockImplementationOnce(() => Promise.resolve());
			await supertest(app).post('/users').send(InputData).expect(500);
		});
	});

	describe('getById', () => {
		test('should return 200', async () => {
			const userId = '16478cbe-9741-4c96-9a0c-177c7635da74';
			const userData: UserEntityWithOutPassword = {
				username: 'string',
				email: 'string@string.com',
				updatedAt: new Date('2024-05-02T03:10:41.027Z'),
				createdAt: new Date('2024-05-02T03:10:41.027Z'),
				userId: '16478cbe-9741-4c96-9a0c-177c7635da74',
				role: 'User'
			};
			jest.spyOn(mockGetUserUseCase, 'execute').mockResolvedValue(userData);
			await supertest(app).get(`/users/${userId}`).expect(200).expect(JSON.stringify(userData));
		});
	});

	describe('login', () => {
		test('should return 200', async () => {
			const loginBody: LoginEntity = {
				email: 'string@string.com',
				password: 'String123'
			};
			const token: string = 'token';
			jest.spyOn(mockLoginUseCase, 'execute').mockResolvedValue(token);
			const res = await supertest(app).post('/users/login').send(loginBody).expect(200);
			expect(res.headers['set-cookie']).toBe(token);
		});
	});
});
