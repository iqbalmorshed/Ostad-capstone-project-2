import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

@Controller()
export class AppController {

  @Get()
  @SkipThrottle()
  getHello(): string {
    return 'QuickHire app is running'
  }
}
