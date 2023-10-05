import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { DomainModule } from "./domain/domain.module";
import { ProfileModule } from "./profile/profile.module";
import "dotenv/config";
import { MailerModule } from "@nestjs-modules/mailer";
// import { TwingAdapter } from "./adapters/twing.adapter";
import { MastersModule } from "./masters/masters.module";
import { SES } from "aws-sdk";
import { TwingAdapter } from "./adapters/twing.adapter";

@Module({
  imports: [
    // MailerModule.forRoot({
    //   transport: {
    //     host: process.env.SMTP_HOST || "localhost",
    //     port: parseInt(process.env.SMTP_PORT, 10) || 1025,
    //     secure: process.env.SMTP_SECURE === "true",
    //     ignoreTLS: process.env.SMTP_SECURE !== "false",
    //     auth: {
    //       user: process.env.SMTP_AUTH_USER || "username",
    //       pass: process.env.SMTP_AUTH_PASS || "password",
    //     },
    //   },
    // }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          SES: new SES({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION,
          }),
        },
        defaults: {
          from: "support@getcampfire.app",
        },
        template: {
          dir: "templates",
          adapter: new TwingAdapter(),
          options: {
            strict_variables: true,
          },
        },
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UserModule,
    DomainModule,
    ProfileModule,
    MastersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
