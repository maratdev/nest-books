import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoleTypes, TRoleTypes } from '../../users/types/user.enum';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20)
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  @IsEnum(RoleTypes)
  role?: TRoleTypes;
}
