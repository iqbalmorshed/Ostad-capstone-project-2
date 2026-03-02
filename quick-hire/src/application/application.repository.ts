import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../common/base/base.repository';
import {
  Application,
  ApplicationDocument,
} from './entities/application.entity';

@Injectable()
export class ApplicationRepository extends BaseRepository<ApplicationDocument> {
  constructor(
    @InjectModel(Application.name) model: Model<ApplicationDocument>,
  ) {
    super(model);
  }
}
