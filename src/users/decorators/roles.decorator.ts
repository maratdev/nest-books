import { SetMetadata } from '@nestjs/common';
import { RoleTypes } from '../types/user.enum';
import { ROLE } from '../constants/role.constants';

export const Roles = (...role: RoleTypes[]) => SetMetadata(ROLE.KEY, role);
