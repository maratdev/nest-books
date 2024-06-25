import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';

export type JwtPayload = {
  userId: Types.ObjectId;
  email: string;
  role: number;
  jwt?: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  validate(payload: JwtPayload) {
    return payload;
  }
}
