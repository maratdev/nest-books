import { IsEnum, IsNumber } from 'class-validator';
import { RoleTypes } from '../types/user.enum';

export class RoleDto {
  @IsNumber()
  @IsEnum(RoleTypes)
  role: RoleTypes;
}
