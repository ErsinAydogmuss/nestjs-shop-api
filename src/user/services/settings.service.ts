import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeCurrentCompanyAndBranchDto } from '../dto/change_current_company_and_branch.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async changeCurrentCompanyAndBranch(
    id: string,
    changeCurrentCompanyAndBranchDto: ChangeCurrentCompanyAndBranchDto,
  ): Promise<Prisma.SettingsUpdateInput> {
    const { currentCompanyId, currentBranchId } =
      changeCurrentCompanyAndBranchDto;

    const existingBranchInCompany = await this.prisma.branch.findFirst({
      where: {
        companyId: currentCompanyId,
        id: currentBranchId,
      },
    });

    if (!existingBranchInCompany) {
      throw new Error('Branch does not exist in the company');
    }

    return await this.prisma.settings.update({
      where: {
        userId: id,
      },
      data: {
        currentCompanyId,
        currentBranchId,
      },
    });
  }
}
