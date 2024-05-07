import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { injectable } from 'inversify';

@injectable()
export class EncryptService {
	hash = (plainText: string) => {
		const salt = genSaltSync(12);
		return hashSync(plainText, salt);
	};

	verify = (plainText: string, hashedText: string) => compareSync(plainText, hashedText);
}
