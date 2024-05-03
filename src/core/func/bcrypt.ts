import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export const hashPassword = (password: string) => {
  const salt = genSaltSync(12);
  return hashSync(password, salt);
};

export const verifyPassword = (plainPassword: string, hashedPassword: string) =>
  compareSync(plainPassword, hashedPassword);
