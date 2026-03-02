import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Application {
  @ApiProperty({ description: 'The job ID that the application is for' })
  @Prop({ type: Types.ObjectId, ref: 'Job', required: true })
  job_id: Types.ObjectId;

  @ApiProperty({ description: 'The name of the applicant' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'The email of the applicant' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ description: 'The resume link of the applicant' })
  @Prop({ required: true })
  resume_link: string;

  @ApiProperty({ description: 'The cover note of the applicant' })
  @Prop({ default: '' })
  cover_note: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

ApplicationSchema.virtual('id').get(function () {
  return this._id?.toHexString();
});
