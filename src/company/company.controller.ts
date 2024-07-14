import { Controller, Delete, Get, Param, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { Response } from 'express';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Res() response: Response) {
    try {
      const result = await this.companyService.findAll();

      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully get all companies!',
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Res() response: Response, @Param('id') id: string) {
    try {
      const result = await this.companyService.delete(+id);

      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully delete company!',
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
