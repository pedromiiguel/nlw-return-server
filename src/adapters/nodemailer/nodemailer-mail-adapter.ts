import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '9bef8b5262e882',
    pass: '259620a7c0312f',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedgat <oi@feedget.com>',
      to: 'Pedro Miguel <pedromrap@gmail.com>',
      subject,
      html: body,
    });
  }
}
