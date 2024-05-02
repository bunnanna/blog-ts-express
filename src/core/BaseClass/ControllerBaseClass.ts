import { Router } from "express";
import { injectable } from "inversify";

@injectable()
export abstract class ControllerBaseClass {
	router: Router;
	constructor() {
		this.router = Router();
	}

	apply: CallableFunction = () => {
		throw new Error("Not Implemented Method");
	};
}
