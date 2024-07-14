import { Injectable } from '@nestjs/common';
import { Branch } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private readonly prisma: PrismaService) {}

  async findBranchesByCompanyId(id: number): Promise<Branch[]> {
    return await this.prisma.branch.findMany({
      where: {
        companyId: id,
      },
      include: {
        contact: true,
        file: true,
      },
    });
  }
}
