import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, SettingsController],
  providers: [UserService, SettingsService],
})
export class UserModule {}
