import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('Hello World!');
    return this.appService.getHello();
  }
}
