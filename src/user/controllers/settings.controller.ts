import { Body, Controller, Param, Put, Res } from '@nestjs/common';
import { SettingsService } from '../services/settings.service';
import { Response } from 'express';
import { ChangeCurrentCompanyAndBranchDto } from '../dto/change_current_company_and_branch.dto';

@Controller('users/settings')
export class SettingsController {
  constructor(private readonly settingService: SettingsService) {}

  @Put(':id')
  async changeCurrentCompanyAndBranch(
    @Param('id') id: string,
    @Body() changeCurrentCompanyAndBranchDto: ChangeCurrentCompanyAndBranchDto,
    @Res() response: Response,
  ) {
    try {
      const result = this.settingService.changeCurrentCompanyAndBranch(
        id,
        changeCurrentCompanyAndBranchDto,
      );

      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully change current company and branch!',
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}
