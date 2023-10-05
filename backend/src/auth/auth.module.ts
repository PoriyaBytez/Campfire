import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "src/user/user.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { DomainController } from "src/domain/domain.controller";

import { DomainService } from "src/domain/domain.service";
import { Domain, domainSchema } from "src/domain/domain.entity";
import { AppService } from "src/app.service";
import { Profile, ProfileSchema } from "src/profile/profile.entity";
import { ProfileController } from "src/profile/profile.controller";
import { ProfileService } from "src/profile/profile.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Domain.name,
        schema: domainSchema,
      },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  controllers: [AuthController, DomainController, ProfileController],
  providers: [AuthService, DomainService, ProfileService, AppService],
  exports: [AuthService],
})
export class AuthModule {}
