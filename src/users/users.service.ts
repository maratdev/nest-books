import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './model/user.model';
import { Model, Types } from 'mongoose';
import { USER } from '../auth/constants';
import { RoleDto } from './dto/role-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  async getDataUser(userId: Types.ObjectId): Promise<UserModel> {
    const check = await this.userModel
      .findById(userId)
      .select('-hashedRt -password -role');
    if (!check) throw new NotFoundException(USER.NOT_FOUND);
    return check;
  }

  async updateUserRole(userId: Types.ObjectId, dto: RoleDto) {
    const user = await this.userModel.findById({
      _id: userId,
    });
    if (!user) throw new NotFoundException(USER.NOT_FOUND);
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          ...dto,
        },
        {
          new: true,
        },
      )
      .select('role')
      .exec();
  }
}
