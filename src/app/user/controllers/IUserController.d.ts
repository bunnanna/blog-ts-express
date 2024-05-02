import { MessageResponse, NoParam } from "@src/core/types/type";
import { RequestHandler } from "express";
import { CreateUserEntity } from "../entities/user";

export default interface IUserController {
	register: RequestHandler<NoParam, MessageResponse, CreateUserEntity>;
}
