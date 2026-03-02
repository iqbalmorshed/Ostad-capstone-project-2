import { Injectable, NotFoundException } from '@nestjs/common';
import {
  JobRepository,
  JobFilter,
  PaginationResult,
} from './job.repository';
import { CreateJobDto } from './dto/create-job.dto';
import { JobDocument } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}

  async findAll(): Promise<JobDocument[]> {
    return this.jobRepository.findAll();
  }

  async findWithPagination(
    filter: JobFilter,
    page = 1,
    limit = 12,
  ): Promise<PaginationResult> {
    return this.jobRepository.findWithPagination(filter, page, limit);
  }

  async findOne(id: string): Promise<JobDocument> {
    const job = await this.jobRepository.findById(id);
    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return job;
  }

  async create(dto: CreateJobDto): Promise<JobDocument> {
    return this.jobRepository.create(dto as unknown as Partial<JobDocument>);
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.jobRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
  }

  async findFeatured(limit = 8): Promise<JobDocument[]> {
    return this.jobRepository.findFeatured(limit);
  }

  async findLatest(limit = 8): Promise<JobDocument[]> {
    return this.jobRepository.findLatest(limit);
  }
}
