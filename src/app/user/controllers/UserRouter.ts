import { Router } from "express";
import { registerValidator } from "../middlewares/validator";
import { IUserController } from "./IUserController";

export default function createUserRouter(userController: IUserController) {
	const userRouter = Router();
	userRouter.post("/", registerValidator, userController.register);

	return userRouter;
}
