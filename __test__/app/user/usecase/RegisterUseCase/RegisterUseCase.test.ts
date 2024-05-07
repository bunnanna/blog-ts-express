import 'reflect-metadata';

import IUserRepository from '@src/app/user/repositories/IUserRepository';
import IRegisterUseCase from '@src/app/user/usecase/RegisterUseCase/IRegisterUsecase';
import RegisterUseCase from '@src/app/user/usecase/RegisterUseCase/RegisterUseCase';
import { EncryptService } from '@src/core/class/EncryptService/EncryptService';
import { mockDeep } from 'jest-mock-extended';

describe('RegisterUseCase', () => {
	let mockUserRepository: IUserRepository;
	let registerUseCase: IRegisterUseCase;

	beforeAll(() => {
		mockUserRepository = mockDeep<IUserRepository>();
		registerUseCase = new RegisterUseCase(mockUserRepository, new EncryptService());
	});
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe('register', () => {
		test('should register completely', async () => {
			const InputData = {
				username: 'string',
				email: 'string@string.com',
				password: 'String123'
			};
			jest.spyOn(mockUserRepository, 'create').mockImplementation(() => Promise.resolve());
			const OutputData = await registerUseCase.execute(InputData);
			expect(OutputData).toBeUndefined();
			expect(mockUserRepository.create.call).toHaveLength(1);
		});
	});
});
