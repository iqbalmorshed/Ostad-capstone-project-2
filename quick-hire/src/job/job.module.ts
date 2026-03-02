import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './entities/job.entity';
import { JobRepository } from './job.repository';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    AuthModule,
  ],
  controllers: [JobController],
  providers: [JobRepository, JobService],
  exports: [JobService, JobRepository],
})
export class JobModule {}
