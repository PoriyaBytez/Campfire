import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Country } from "./entities/country.entity";
import { Model } from "mongoose";
import { Describe } from "./entities/describe.entity";
import { Character } from "./entities/character.entity";
import { CreateCountryDto } from "./dto/create-country.dto";
import { CreateDescribeDto } from "./dto/create-describe.dto";
import { CreateCharacterDto } from "./dto/create-character.dto";

@Injectable()
export class MastersService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
    @InjectModel(Describe.name) private readonly describeModel: Model<Describe>,
    @InjectModel(Character.name) private readonly characterModel: Model<Character>
  ) {}

  async findAllCountry(): Promise<Country[]> {
    return this.countryModel.find();
  }

  async findAllDescribe(): Promise<Describe[]> {
    return this.describeModel.find();
  }
  async findAllCharacter(): Promise<Character[]> {
    return this.characterModel.find();
  }
  async findById(id: string): Promise<Country> {
    const Country = await this.countryModel.findById(id);
    if (!Country) {
      throw new NotFoundException("Country not found");
    }
    return Country;
  }
  async createcountry(dto: CreateCountryDto) {
    const createcountry = new this.countryModel(dto);
    try {
      await createcountry.save();
      return createcountry;
    } catch (error) {
      return "Contry exists";
    }
  }
  async createdescribe(dto: CreateDescribeDto) {
    const createdescribe = new this.describeModel(dto);
    try {
      await createdescribe.save();
      return createdescribe;
    } catch (error) {
      return "Internal error";
    }
  }
  async createCharacter(dto: CreateCharacterDto) {
    const createcharacter = new this.characterModel(dto);
    try {
      await createcharacter.save();
      return createcharacter;
    } catch (error) {
      return "Internal error";
    }
  }
  async updateCountry(id: string, dto: CreateCountryDto): Promise<Country> {
    const country = await this.countryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!country) {
      throw new NotFoundException("Country not found");
    }
    return country;
  }
  async updateDescribe(id: string, dto: CreateDescribeDto): Promise<Describe> {
    const describe = await this.describeModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!describe) {
      throw new NotFoundException("Describe not found");
    }
    return describe;
  }
  async updateCharacter(id: string, dto: CreateCharacterDto): Promise<Character> {
    const character = await this.characterModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!character) {
      throw new NotFoundException("Character not found");
    }
    return character;
  }
}
