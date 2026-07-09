import { Injectable } from '@nestjs/common';
import { User } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashingService } from '../common/security/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  public async createOne(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashingService.hash(
      createUserDto.password,
    );
    createUserDto.password = hashedPassword;

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        passwordHash: hashedPassword,
        role: createUserDto.role,
      },
    });
  }

  /** Finds a user by their email address */
  public async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}
