import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
