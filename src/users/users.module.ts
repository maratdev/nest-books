import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './model/user.model';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: UserModel.name,
        useFactory: () => {
          return UserSchema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
