import { $Enums } from '@prisma/client';

export interface UserEntity {
  userId: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role: $Enums.Role;
}
export interface CreateUserEntity {
  username: string;
  email: string;
  password: string;
}

export interface LoginEntity {
  email: string;
  password: string;
}
