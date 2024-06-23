import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document {
  @Prop({
    required: true,
    maxlength: 150,
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
    default: 2,
  })
  role: number;

  @Prop()
  hashedRt: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
