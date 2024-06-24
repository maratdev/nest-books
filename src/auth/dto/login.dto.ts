import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class LoginDto extends OmitType(UserDto, [
  'username',
  'role',
] as const) {}
