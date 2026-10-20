import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}


  async findUserByEmail(email:string){

    return this.prisma.user.findUnique({where: {
      email: email
    }, select: {
      id: true,
      password: true,
      name: true,
      email:true,
      role: true,
      createdAt:true,
      updatedAt: true

    }})
  }

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
      select: {
        email: true,
      },
    });

    if (existingUser) {
      throw new ConflictException('User Already exists');
    }

    //** Hashing Password Before Saving ***
    const saltRounds = 10;
    const password: string = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const newUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        role: createUserDto.role,
        password: password,
      },
    });

    return {
      message: 'User Created Successfully',
      data: newUser,
    };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return users;
  }
}
