import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AliveType } from './shared/types/app.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  isAlive(): AliveType {
    return this.appService.isAlive();
  }
}
