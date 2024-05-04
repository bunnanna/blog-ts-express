import app from '@src/app';
import UserController from '@src/app/user/controllers/UserController';
import IRegisterUseCase from '@src/app/user/usecase/RegisterUseCase/IRegisterUsecase';
import ErrorHandlerMiddleware from '@src/core/middlewares/ErrorHandlerMiddleware';
import { mockDeep } from 'jest-mock-extended';
import supertest from 'supertest';

describe('UserController', () => {
	let mockRegisterUseCase: IRegisterUseCase;
	beforeAll(() => {
		mockRegisterUseCase = mockDeep<IRegisterUseCase>();
		const controller = new UserController(mockRegisterUseCase);
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
				password: 'String123',
			};
			jest.spyOn(mockRegisterUseCase, 'execute').mockImplementationOnce(() => Promise.resolve());
			await supertest(app).post('/users').send(InputData).expect(201).expect({ message: 'user created' });
		});

		test('should return 500', async () => {
			const InputData = {
				username: '',
				email: 'notemail',
				password: 'badpassword',
			};
			jest.spyOn(mockRegisterUseCase, 'execute').mockImplementationOnce(() => Promise.resolve());
			await supertest(app).post('/users').send(InputData).expect(500);
		});
	});
});
