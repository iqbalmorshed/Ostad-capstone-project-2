import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ example: 'Senior Backend Developer' })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  @IsNotEmpty({ message: 'Company is required' })
  company: string;

  @ApiProperty({ example: 'Remote' })
  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  location: string;

  @ApiProperty({ example: 'Engineering' })
  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @ApiProperty({ example: 'We are looking for...' })
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}
