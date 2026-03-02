import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  /** Public: list jobs with optional filters and pagination */
  @Get()
  @SkipThrottle({ strict: true })
  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @ApiOperation({ summary: 'List jobs (public)' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'location', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Paginated list of jobs' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async listPublic(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('location') location?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = Math.max(1, parseInt(page || '1', 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit || '12', 10) || 12));
    return this.jobService.findWithPagination(
      { search, category, location },
      pageNum,
      limitNum,
    );
  }

  /** Public: featured jobs (first 8) */
  @Get('featured')
  @SkipThrottle({ strict: true })
  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @ApiOperation({ summary: 'Get featured jobs (public)' })
  @ApiResponse({ status: 200, description: 'List of featured jobs' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async listFeatured() {
    const jobs = await this.jobService.findFeatured(8);
    return { data: jobs };
  }

  /** Public: latest jobs (8 most recent by createdAt) */
  @Get('latest')
  @SkipThrottle({ strict: true })
  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @ApiOperation({ summary: 'Get latest jobs (public)' })
  @ApiResponse({ status: 200, description: 'List of latest jobs' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async listLatest() {
    const jobs = await this.jobService.findLatest(8);
    return { data: jobs };
  }

  /** Public: get single job by id */
  @Get(':id')
  @SkipThrottle({ strict: true })
  @Throttle({ default: { limit: 100, ttl: 60000 } })
  @ApiOperation({ summary: 'Get job by id (public)' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiResponse({ status: 200, description: 'Job details' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async getOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ strict: { limit: 10, ttl: 60000, blockDuration: 900000 } })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Create job (admin only)' })
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ status: 201, description: 'Job created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 429, description: 'Too many requests; IP blocked' })
  async create(@Body() dto: CreateJobDto) {
    return this.jobService.create(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Throttle({ strict: { limit: 10, ttl: 60000, blockDuration: 900000 } })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Delete job (admin only)' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiResponse({ status: 204, description: 'Job deleted' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @ApiResponse({ status: 429, description: 'Too many requests; IP blocked' })
  async delete(@Param('id') id: string) {
    await this.jobService.delete(id);
  }
}
