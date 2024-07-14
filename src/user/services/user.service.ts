import { Injectable } from '@nestjs/common';
import { User, Theme } from '@prisma/client';
import { RegisterDto } from 'src/authentication/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        wallet: true,
      },
    });
  }

  async create(data: RegisterDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        // buna bak secret key yerine koy
        password: await bcrypt.hash(data.password, 10),
        contact: {
          create: {
            email: data.email,
            phone: data.phone,
          },
        },
        settings: {
          create: {
            theme: Theme.LIGHT,
          },
        },
        wallet: {
          create: {
            balance: 0,
            points: 0,
          },
        },
      },
    });
  }
}
