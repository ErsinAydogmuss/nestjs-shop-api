import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { Response } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findProductsByBranchId(
    @Query('branchId') branchId: number,
    @Query('productTypeId') productTypeId: number,
    @Res() response: Response,
  ) {
    try {
      const result = await this.productService.findProductsByBranchId(
        +branchId,
        +productTypeId,
      );

      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully get all products!',
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
