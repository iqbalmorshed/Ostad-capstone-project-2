import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export const USER_ROLES = ['user', 'admin', 'super-admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc: unknown, ret: Record<string, unknown>) => {
      delete ret.password;
      return ret;
    },
  },
  toObject: { virtuals: true },
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: true })
  password: string;

  @Prop({ required: true, enum: USER_ROLES, default: 'user' })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id?.toHexString();
});
