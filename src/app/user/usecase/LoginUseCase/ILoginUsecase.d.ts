import { LoginEntity } from "../../entities/user";

export interface ILoginUseCase {
	execute: (loginBody: LoginEntity) => Promise<string>;
}
