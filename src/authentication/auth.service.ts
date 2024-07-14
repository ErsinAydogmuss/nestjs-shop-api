import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/services/user.service';
import { LoginDto } from 'src/authentication/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string } | NotFoundException> {
    const { username, password } = loginDto;

    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    return {
      token: this.jwtService.sign({ username }),
    };
  }

  async register(createDto: RegisterDto): Promise<{ token: string }> {
    const user = await this.userService.create(createDto);

    return {
      token: this.jwtService.sign({ username: user.username }),
    };
  }
}
