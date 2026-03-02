import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Application,
  ApplicationSchema,
} from './entities/application.entity';
import { ApplicationRepository } from './application.repository';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    AuthModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationRepository, ApplicationService],
  exports: [ApplicationService, ApplicationRepository],
})
export class ApplicationModule {}
