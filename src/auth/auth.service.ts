import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { USER } from './constants';
import { Tokens } from './types';
import { UserModel } from '../users/model/user.model';
import { EmailService } from '../email/email.service';
import { LoginDto } from './dto/login.dto';
import { EmailConfirmTypes } from '../users/types/user.enum';
import { IUser } from './interfaces/user.i';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async isAuthenticated(token: string) {
    if (!token) {
      throw new BadRequestException(USER.INVALID_TOKEN);
    }
    try {
      const { email, userId } = await this.jwtService.decode(token);
      await this.getDataUser({ email });
      await this.userModel.findByIdAndUpdate(userId, {
        emailActivate: EmailConfirmTypes.Confirmed,
      });
    } catch {
      throw new BadRequestException(USER.INVALID_TOKEN);
    }

    return USER.CONFIRM_EMAIL;
  }

  private async hashData(data: string) {
    return hash(data, 10);
  }

  async login(userDto: LoginDto): Promise<Tokens> {
    const user = await this.validateUser(userDto.email, userDto.password);
    const tokens = await this.getToken(user._id, user.email, user.role);
    await this.updateRtHash(user._id, tokens.refresh_token);
    return {
      access_token: tokens.access_token,
    };
  }

  async register(
    userDto: UserDto,
  ): Promise<Pick<IUser, '_id' | 'username' | 'email'>> {
    const salt = await genSalt(10);
    const user = await this.userModel.findOne(
      { email: userDto.email },
      'email',
    );
    if (user) throw new ConflictException(USER.DUPLICATE);

    const newUser = new this.userModel({
      ...userDto,
      password: await hash(userDto.password, salt),
    });

    const addedUser = await newUser.save();
    const tokens = await this.getToken(
      <Types.ObjectId>newUser._id,
      userDto.email,
    );
    await this.updateRtHash(<Types.ObjectId>newUser._id, tokens.refresh_token);
    await this.emailService.sendEmailConfirm(
      newUser.email,
      tokens.access_token,
    );
    return this.returnUserFields(<IUser>addedUser);
  }

  async logout(id: Types.ObjectId) {
    return this.userModel
      .findByIdAndUpdate(
        id,
        {
          hashedRt: null,
        },
        {
          new: true,
        },
      )
      .select('hashedRt');
  }

  async refreshTokens(id: Types.ObjectId, rt: string): Promise<Tokens> {
    const user = await this.userModel.findById(id);
    if (!user || !user.hashedRt) throw new ForbiddenException(USER.NOT_FOUND);

    const rtMatch = await compare(rt, user.hashedRt);
    if (!rtMatch) throw new UnauthorizedException(USER.LOGIN_EXIST);

    const tokens = await this.getToken(<Types.ObjectId>user._id, user.email);
    await this.updateRtHash(<Types.ObjectId>user._id, tokens.refresh_token);
    return { access_token: tokens.access_token };
  }

  async getToken(
    userId: Types.ObjectId,
    email: string,
    role?: number,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { userId, email, role },
        {
          expiresIn: this.configService.get<string>('ACCESS_JWT'),
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        { userId, email, role },
        {
          expiresIn: this.configService.get<string>('REFRESH_JWT'),
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(id: Types.ObjectId, rt: string) {
    const hashedRt = await this.hashData(rt);
    return this.userModel.findByIdAndUpdate(id, { hashedRt });
  }

  //--------------------- Вспомогательные методы --------------------/
  private returnUserFields(user: Pick<IUser, '_id' | 'username' | 'email'>) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
  }

  private async getDataUser({
    email,
  }: Pick<IUser, 'email'>): Promise<UserModel> {
    const check = await this.userModel.findOne({ email });
    if (!check) throw new NotFoundException(USER.NOT_FOUND);
    return check;
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<IUser, 'email' | '_id' | 'role'>> {
    const user = await this.getDataUser({ email });
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException(USER.LOGIN_EXIST);
    return {
      email: user.email,
      role: user.role,
      _id: <Types.ObjectId>user._id,
    };
  }
}
