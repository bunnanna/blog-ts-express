import 'reflect-metadata';

import IUserRepository from '@src/app/user/repositories/IUserRepository';
import IRegisterUseCase from '@src/app/user/usecase/RegisterUseCase/IRegisterUsecase';
import RegisterUseCase from '@src/app/user/usecase/RegisterUseCase/RegisterUseCase';

class MockUserRepository implements IUserRepository {
	// getAll: IUserRepository['getAll'] = () => {
	// 	throw new Error('Not Implemented Method');
	// };

	// getById: IUserRepository['getById'] = () => {
	// 	throw new Error('Not Implemented Method');
	// };

	create: IUserRepository['create'] = () => {
		throw new Error('Not Implemented Method');
	};

	// update: IUserRepository['update'] = () => {
	// 	throw new Error('Not Implemented Method');
	// };
}

describe('RegisterUseCase', () => {
	let mockUserRepository: MockUserRepository;
	let registerUseCase: IRegisterUseCase;

	beforeAll(() => {
		mockUserRepository = new MockUserRepository();
		registerUseCase = new RegisterUseCase(mockUserRepository);
	});
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe('register', () => {
		test('should register completely', async () => {
			const InputData = {
				username: 'string',
				email: 'string@string.com',
				password: 'String123',
			};
			jest.spyOn(mockUserRepository, 'create').mockImplementation(() => Promise.resolve());
			const OutputData = await registerUseCase.execute(InputData);
			expect(OutputData).toBeUndefined();
			expect(mockUserRepository.create.call).toHaveLength(1);
		});
	});
});
