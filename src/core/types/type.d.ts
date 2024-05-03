import { Result, ValidationError } from 'express-validator';

export interface NoParam {}

export type ValidateRequestError = Result<ValidationError>;
export interface MessageResponse {
	message: string;
}
