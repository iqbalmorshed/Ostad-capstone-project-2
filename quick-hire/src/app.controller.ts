import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return 'QuickHire app is running';
  }

  @Get('health')
  @SkipThrottle({ default: true, strict: true, application: true })
  health(): { status: string } {
    return { status: 'ok' };
  }
}
