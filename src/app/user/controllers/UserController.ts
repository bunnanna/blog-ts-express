import { validationResult } from "express-validator";
import { inject, injectable } from "inversify";
import { userIdentifier } from "../di/userIdentifiers";
import { IRegisterUseCase } from "../usecase/RegisterUseCase/IRegisterUsecase";
import { IUserController } from "./IUserController";

@injectable()
export default class UserController implements IUserController {
	constructor(
		@inject(userIdentifier.IRegisterUseCase)
		private registerUseCase: IRegisterUseCase
	) {
		console.log(`User Controller Created`);
	}

	register: IUserController["register"] = async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) throw validationErrors;
		const registerBody = req.body;
		await this.registerUseCase.execute(registerBody);
		res.status(201).json({ message: "user created" });
	};
}
