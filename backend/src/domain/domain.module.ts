import { Module } from "@nestjs/common";
import { DomainService } from "./domain.service";
import { DomainController } from "./domain.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Domain, domainSchema } from "./domain.entity";

@Module({
  imports: [MongooseModule.forFeature([{ name: Domain.name, schema: domainSchema }])],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {}
