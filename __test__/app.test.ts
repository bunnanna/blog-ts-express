import app from "@src/app";
import request from "supertest";
describe("app", () => {
	test("health", async () => {
		await request(app).get("/").expect(200).expect("Hello World!");
	});
});
