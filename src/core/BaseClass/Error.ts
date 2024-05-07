import { Result, ValidationError } from 'express-validator';

export class HttpStatusError extends Error {}

export class BadRequestError extends HttpStatusError {
	statusCode: number = 400;
}

export class ValidationBadRequestError extends BadRequestError {
	constructor(public details: Result<ValidationError>) {
		super(JSON.stringify(details));
	}
}
