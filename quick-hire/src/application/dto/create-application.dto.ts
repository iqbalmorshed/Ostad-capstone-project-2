import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Job ID' })
  @IsString()
  @IsNotEmpty({ message: 'Job ID is required' })
  job_id: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({
    example: 'https://example.com/resume.pdf',
    description: 'URL to resume',
  })
  @IsUrl({}, { message: 'Resume link must be a valid URL' })
  resume_link: string;

  @ApiPropertyOptional({ example: 'I am interested in this role...' })
  @IsOptional()
  @IsString()
  cover_note?: string;
}
