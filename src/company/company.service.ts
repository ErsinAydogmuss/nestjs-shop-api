import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Company[]> {
    return await this.prisma.company.findMany({
      include: {
        file: true,
        contact: true,
      },
    });
  }

  // delete by id
  async delete(id: number): Promise<Company> {
    return await this.prisma.company.delete({
      where: {
        id,
      },
    });
  }
}
