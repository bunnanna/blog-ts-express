import { validationResult } from "express-validator";
import { IRegisterUseCase } from "../usecase/RegisterUseCase/IRegisterUsecase";
import { IUserController } from "./IUserController";

export default class UserController implements IUserController {
	constructor(private registerUseCase: IRegisterUseCase) {
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
