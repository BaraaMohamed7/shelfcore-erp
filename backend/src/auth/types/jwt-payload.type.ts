import { Role } from '../../generated/prisma/client';

export interface AccessTokenPayload {
  sub: number;
  email: string;
  name: string;
  role: Role;
}
