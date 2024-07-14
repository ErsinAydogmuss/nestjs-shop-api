import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
