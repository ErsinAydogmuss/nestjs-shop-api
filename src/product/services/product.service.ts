import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductsByBranchId(id: number, productTypeId: number) {
    return await this.prisma.product.findMany({
      where: {
        branchId: id,
        productTypeId: productTypeId,
      },
      include: {
        image: true,
        productType: true,
      },
    });
  }
}
