import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { Response } from 'express';

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('companyId') companyId: number,
    @Res() response: Response,
  ) {
    try {
      const result =
        await this.branchService.findBranchesByCompanyId(+companyId);

      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully get all branches!',
        result: result,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}
