import { MailAdapter, SendMailData } from "./mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6493b80f6b6cbd",
        pass: "5095f57500c484"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({ subject, body}: SendMailData){
        transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Aurelio Aquino <aurelio.obmep@gmail.com>',
            subject,
            html: body
        })
    }
}