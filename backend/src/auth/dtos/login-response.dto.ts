import { User } from '../../generated/prisma/client';

class loginUserDto {
  id!: number;
  email!: string;
  name!: string;
  role!: string;
  createdAt!: Date;
}
export class LoginResponseDto {
  user: loginUserDto;
  accessToken!: string;

  constructor(user: User, accessToken: string) {
    this.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
    this.accessToken = accessToken;
  }
}
