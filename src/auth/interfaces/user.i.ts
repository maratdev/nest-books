import { Types } from 'mongoose';
import { TEmailConfirm, TRoleTypes } from '../../users/types/user.enum';

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  role: TRoleTypes;
  hashedRt: string;
  emailActivate: TEmailConfirm;
}
