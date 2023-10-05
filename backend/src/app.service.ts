import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  async emailVerification(toEmail: string, subject: string, data: any) {
    return this.mailerService
      .sendMail({
        from: "support@getcampfire.app",
        to: toEmail,
        subject: subject || "Verify your email",
        context: { domain: process.env.DOMAIN, ...data },
        template: "email-verification",
        priority: "high",
      })
      .then((value) => console.log("Email sent"))
      .catch((error) => console.log("ERRORMAIL", error));
  }
}
