import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Doctor Tooth" <doctorblue3412@gmail.com>',
      subject: 'Тимчасовий пароль для отрамання доступу',
      template: './conf.hbs',
      context: {
        name: user.name,
        password: user.password,
      },
    });
  }

  async sendQuestionMessage(data: any) {
    await this.mailerService.sendMail({
      to: 'doctorblue3412@gmail.com', // admin mail
      from: `"Client" <${data.sender}>`,
      subject: 'Питання відвовіді',
      template: './consultation.hbs',
      context: {
        sender: data.sender,
        name: data.name,
        description: data.description,
      },
    });
  }

  async sendVerificationCode(data: any) {
    await this.mailerService.sendMail({
      to: data.email, // admin mail
      from: `"Health Clinic"`,
      subject: 'Питання відвовіді',
      template: './verification.hbs',
      context: {
        code: data.code,
      },
    });
  }
}
