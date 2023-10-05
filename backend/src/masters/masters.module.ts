import { Module } from "@nestjs/common";
import { MastersService } from "./masters.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Country, CountrySchema } from "./entities/country.entity";
import { Describe, DescribeSchema } from "./entities/describe.entity";
import { Character, CharacterSchema } from "./entities/character.entity";
import { MastersController } from "./masters.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Country.name,
        schema: CountrySchema,
      },
      {
        name: Describe.name,
        schema: DescribeSchema,
      },
      {
        name: Character.name,
        schema: CharacterSchema,
      },
    ]),
  ],
  controllers: [MastersController],
  providers: [MastersService],
})
export class MastersModule {}
