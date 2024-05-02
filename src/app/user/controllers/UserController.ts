import ControllerBaseClass from "@src/core/BaseClass/ControllerBaseClass";
import { validationResult } from "express-validator";
import { inject, injectable } from "inversify";
import { userIdentifier } from "../di/userIdentifiers";
import { registerValidator } from "../middlewares/validator";
import IRegisterUseCase from "../usecase/RegisterUseCase/IRegisterUsecase";
import IUserController from "./IUserController";

@injectable()
export default class UserController
	extends ControllerBaseClass
	implements IUserController
{
	constructor(
		@inject(userIdentifier.IRegisterUseCase)
		private registerUseCase: IRegisterUseCase
	) {
		super();
		this.apply();
		console.log(`User Controller Created`);
	}

	apply: CallableFunction = () => {
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
