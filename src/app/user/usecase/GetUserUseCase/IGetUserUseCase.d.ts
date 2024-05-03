import { UserEntity } from '../../entities/user';

export interface IGetUserUseCase {
  execute: (userId: string) => Promise<UserEntity>;
}
