import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserDto } from '../auth/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from '../auth/decorators/get-user.decorator';
import { Types } from 'mongoose';
import { UsersService } from './users.service';
import { RoleDto } from './dto/role-user.dto';
import { Roles } from './decorators/roles.decorator';
import { RoleTypes } from './types/user.enum';
import { ParseObjectIdPipe } from './pipes/id.validation.pipes';
import { RolesGuard } from './guards/roles.guard';
import { LoginDto } from '../auth/dto/login.dto';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
  }),
)
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  //---------------------------------Auth------------------------------------/
  @Get('confirm/:id')
  @HttpCode(HttpStatus.OK)
  confirm(@Param('id') token: string) {
    return this.authService.isAuthenticated(token);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@GetCurrentUser('userId') id: Types.ObjectId) {
    return this.authService.logout(id);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUser('jwt') refreshToken: string,
    @GetCurrentUser('userId') id: Types.ObjectId,
  ) {
    return this.authService.refreshTokens(id, refreshToken);
  }

  //-------------------------- Users---------------------------------------/

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('me')
  async getUser(@GetCurrentUser('userId') id: Types.ObjectId) {
    return this.usersService.getDataUser(id);
  }

  @UseGuards(AuthGuard('jwt-refresh'), RolesGuard)
  @Roles(RoleTypes.Admin)
  @Put(':id/role')
  async updateRole(
    @Param('id', ParseObjectIdPipe)
    userId: Types.ObjectId,
    @Body() updateDto: RoleDto,
  ) {
    return this.usersService.updateUserRole(userId, updateDto);
  }
}
