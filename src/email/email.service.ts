import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly emailService: MailerService) {}

  async sendEmailConfirm(user: string, token: string) {
    const url = `${process.env.APP_URL}/users/confirm/${token}`;
    const html = `<p>Please click the link below to confirm your email address:</p><a href="${url}">Confirm my email</a>`;
    await this.emailService.sendMail({
      from: 'Email',
      to: user, //кому
      subject: 'Confirm your email address',
      html,
    });
  }
}
