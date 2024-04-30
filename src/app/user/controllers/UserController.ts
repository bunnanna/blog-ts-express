import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { MessageResponse, NoParam } from "../../../utils/type";
import { registerValidator } from "../middlewares/validator";
import { CreateUserEntity } from "../usecase/UserEntity";
import { register } from "../usecase/UserUseCase";

const userRouter = Router();

userRouter.post(
	"/",
	registerValidator,
	async (
		req: Request<NoParam, MessageResponse, CreateUserEntity>,
		res: Response
	) => {
		if (validationResult(req))
			return res.status(400).json(validationResult(req));
		const registerBody = req.body;
		await register(registerBody);
		res.status(201).json({ message: "user created" });
	}
);

export default userRouter;
