import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './authentication/auth.module';
import { CompanyModule } from './company/company.module';
import { BranchModule } from './branch/branch.module';
import { ProductModule } from './product/product.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CompanyModule,
    BranchModule,
    PrismaModule,
    ProductModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
