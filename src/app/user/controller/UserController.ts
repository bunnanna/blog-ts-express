import { Request, Router } from "express";
import { MessageResponse, NoParam } from "../../../utils/type";
import { CreateUserEntity } from "../usecase/UserEntity";
import { register } from "../usecase/UserUseCase";

const userRouter = Router();

userRouter.post(
	"/",
	async (req: Request<NoParam, MessageResponse, CreateUserEntity>, res) => {
		const registerBody = req.body;
		await register(registerBody);
		res.status(201).json({ message: "user created" });
	}
);

export default userRouter;
