import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('MONGODB_URI'),
      dbName: this.configService.get<string>('MONGO_DB'),
    };
  }
}
