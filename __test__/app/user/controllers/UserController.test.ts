import app from "@src/app";
import UserController from "@src/app/user/controllers/UserController";
import { CreateUserEntity } from "@src/app/user/entities/user";
import IRegisterUseCase from "@src/app/user/usecase/RegisterUseCase/IRegisterUsecase";
import supertest from "supertest";

class MockRegisterUseCase implements IRegisterUseCase {
	execute: IRegisterUseCase["execute"] = (createUser: CreateUserEntity) => {
		throw new Error("Not Implemented Method");
	};
}
describe("UserController", () => {
	let mockRegisterUseCase: MockRegisterUseCase;
	beforeAll(() => {
		mockRegisterUseCase = new MockRegisterUseCase();
		const controller = new UserController(mockRegisterUseCase);
		app.use("/users", controller.router);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("register", () => {
		test("should return 201", async () => {
			const InputData = {
				username: "string",
				email: "string@string.com",
				password: "String123",
			};
			jest
				.spyOn(mockRegisterUseCase, "execute")
				.mockImplementationOnce(() => Promise.resolve());
			supertest(app)
				.post("/users")
				.send(InputData)
				.expect(201)
				.expect("message", "user created");
		});

		test("should return 500", () => {
			const InputData = {
				username: "",
				email: "notemail",
				password: "badpassword",
			};
			jest
				.spyOn(mockRegisterUseCase, "execute")
				.mockImplementationOnce(() => Promise.resolve());
			supertest(app).post("/users").send(InputData).expect(500);
		});
	});
});
