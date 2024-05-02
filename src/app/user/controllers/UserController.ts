import { Router } from "express";
import { validationResult } from "express-validator";
import { inject, injectable } from "inversify";
import { userIdentifier } from "../di/userIdentifiers";
import { registerValidator } from "../middlewares/validator";
import { IRegisterUseCase } from "../usecase/RegisterUseCase/IRegisterUsecase";
import { IUserController } from "./IUserController";

@injectable()
export default class UserController implements IUserController {
	public router: Router;
	constructor(
		@inject(userIdentifier.IRegisterUseCase)
		private registerUseCase: IRegisterUseCase
	) {
		this.router = Router();
		this.apply();
		console.log(`User Controller Created`);
	}
	apply: () => void = () => {
		this.router.post("/", registerValidator, this.register);
	};

	register: IUserController["register"] = async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) throw validationErrors;
		const registerBody = req.body;
		await this.registerUseCase.execute(registerBody);
		res.status(201).json({ message: "user created" });
	};
}
