import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Job {
  @Prop({ required: true })
  @ApiProperty({ description: 'The title of the job' })
  title: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The company of the job' })
  company: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The location of the job' })
  location: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The category of the job' })
  category: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The description of the job' })
  description: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);

JobSchema.virtual('id').get(function () {
  return this._id?.toHexString();
});
