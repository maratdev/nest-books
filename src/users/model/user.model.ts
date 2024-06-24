import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  EmailConfirmTypes,
  RoleTypes,
  TEmailConfirm,
  TRoleTypes,
} from '../types/user.enum';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document {
  @Prop({
    maxlength: 150,
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    enum: RoleTypes,
    default: RoleTypes.User,
  })
  role: TRoleTypes;

  @Prop()
  hashedRt: string;

  @Prop({
    enum: EmailConfirmTypes,
    default: EmailConfirmTypes.Unconfirmed,
  })
  emailActivate: TEmailConfirm;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
