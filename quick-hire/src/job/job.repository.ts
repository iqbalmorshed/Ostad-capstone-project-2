import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../common/base/base.repository';
import { Job, JobDocument } from './entities/job.entity';

export interface JobFilter {
  search?: string;
  category?: string;
  location?: string;
}

export interface PaginationResult {
  jobs: JobDocument[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

@Injectable()
export class JobRepository extends BaseRepository<JobDocument> {
  constructor(@InjectModel(Job.name) model: Model<JobDocument>) {
    super(model);
  }

  async findWithPagination(
    filter: JobFilter,
    page = 1,
    limit = 12,
  ): Promise<PaginationResult> {
    const q: Record<string, unknown> = {};
    if (filter.category) q.category = filter.category;
    if (filter.location) q.location = new RegExp(filter.location, 'i');
    if (filter.search) {
      q.$or = [
        { title: new RegExp(filter.search, 'i') },
        { company: new RegExp(filter.search, 'i') },
        { description: new RegExp(filter.search, 'i') },
      ];
    }
    const skip = (page - 1) * limit;
    const [jobs, total] = await Promise.all([
      this.model.find(q).skip(skip).limit(limit).lean().exec(),
      this.model.countDocuments(q).exec(),
    ]);
    return {
      jobs: jobs as JobDocument[],
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
    };
  }

  async findFeatured(limit = 8): Promise<JobDocument[]> {
    const jobs = await this.model
      .find({})
      .limit(limit)
      .lean()
      .exec();
    return jobs as JobDocument[];
  }

  async findLatest(limit = 8): Promise<JobDocument[]> {
    const jobs = await this.model
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();
    return jobs as JobDocument[];
  }
}
