import { MessageResponse, NoParam } from '@src/core/types/type';
import { RequestHandler } from 'express';
import { CreateUserEntity, LoginEntity, UserEntityWithOutPassword } from '../entities/user';

export default interface IUserController {
	register: RequestHandler<NoParam, MessageResponse, CreateUserEntity>;
	getUser: RequestHandler<{ userId: string }, UserEntityWithOutPassword>;
	login: RequestHandler<NoParam, unknown, LoginEntity>;
	getUserByToken: RequestHandler<NoParam, UserEntityWithOutPassword, unknown, unknown, { userId: string }>;
}
