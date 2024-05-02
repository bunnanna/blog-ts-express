import { RequestHandler } from "express";
import { MessageResponse, NoParam } from "../../../core/types/type";
import { CreateUserEntity } from "../entities/user";

export interface IUserController {
	register: RequestHandler<NoParam, MessageResponse, CreateUserEntity>;
}
