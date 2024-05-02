import { Router } from "express";
import { injectable } from "inversify";

@injectable()
export default abstract class ControllerBaseClass {
	router: Router;
	constructor() {
		this.router = Router();
	}
}
