import { IGetUserUseCase } from './IGetUserUseCase';

export default class GetUserUseCase implements IGetUserUseCase {
	execute: IGetUserUseCase['execute'] = (userId: string) => {
		throw new Error('Not Implemented Method');
	};
}
