import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserData } from 'src/user/types/user.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    console.log(user)

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // console.log("fah" ,user.password)
    const passwordMatches = await bcrypt.compare(password, user.password);
    
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return user;
  }

  async login(user: UserData) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: payload
    };
  }
}
