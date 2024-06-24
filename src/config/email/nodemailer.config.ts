import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';

export const getNodeMailerConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => {
  return {
    transport: {
      service: configService.get('EMAIL_HOST'),
      secure: false,
      auth: {
        user: configService.get('EMAIL_USERNAME'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    },
  };
};
