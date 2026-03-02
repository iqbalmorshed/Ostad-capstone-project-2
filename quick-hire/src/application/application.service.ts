import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationDocument } from './entities/application.entity';
import { Types } from 'mongoose';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
  ) {}

  async submit(dto: CreateApplicationDto): Promise<ApplicationDocument> {
    const data = {
      ...dto,
      job_id: new Types.ObjectId(dto.job_id),
    } as unknown as Partial<ApplicationDocument>;
    return this.applicationRepository.create(data);
  }
}
