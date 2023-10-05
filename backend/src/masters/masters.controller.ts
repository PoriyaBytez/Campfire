import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { MastersService } from "./masters.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { createErrorResponse, createSuccessResponse } from "src/types/api";
import { Country } from "./entities/country.entity";
import { CreateCountryDto } from "./dto/create-country.dto";
import { Describe } from "./entities/describe.entity";
import { CreateDescribeDto } from "./dto/create-describe.dto";
import { Character } from "./entities/character.entity";
import { CreateCharacterDto } from "./dto/create-character.dto";

@ApiTags("Masters")
@Controller("masters")
export class MastersController {
  constructor(private readonly masterService: MastersService) {}

  @Get("country")
  @ApiOperation({ summary: "Get all Country" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of Country",
    type: Country,
    isArray: true,
  })
  async findAll() {
    try {
      const data = await this.masterService.findAllCountry();
      return createSuccessResponse(HttpStatus.OK, "Country found successfully", data);
    } catch (error) {
      throw new NotFoundException(createErrorResponse(HttpStatus.NOT_FOUND, "Country not found"));
    }
  }
  @Post("country")
  @ApiOperation({ summary: "Create a new Country" })
  @ApiResponse({ status: 201, description: "Country created successfully", type: Country })
  @ApiResponse({ status: 409, description: "Country with the provided detail already exists" })
  async create(@Body() dto: CreateCountryDto) {
    return this.masterService.createcountry(dto);
  }
  @Put("country/:id")
  @ApiOperation({ summary: "Update a Country" })
  @ApiResponse({ status: 200, description: "Country updated successfully", type: Country })
  @ApiResponse({ status: 404, description: "Country not found" })
  async update(@Param("id") id: string, @Body() dto: CreateCountryDto): Promise<Country> {
    return this.masterService.updateCountry(id, dto);
  }
  @Get("describe")
  @ApiOperation({ summary: "Get all Describe" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of Describe",
    type: Describe,
    isArray: true,
  })
  async findAllDescribe() {
    try {
      const data = await this.masterService.findAllDescribe();
      return createSuccessResponse(HttpStatus.OK, "Describe found successfully", data);
    } catch (error) {
      throw new NotFoundException(createErrorResponse(HttpStatus.NOT_FOUND, "Describe not found"));
    }
  }
  @Post("describe")
  @ApiOperation({ summary: "Create a new Describe" })
  @ApiResponse({ status: 201, description: "Describe created successfully", type: Describe })
  @ApiResponse({ status: 409, description: "Describe with the provided detail already exists" })
  async createdescribe(@Body() dto: CreateDescribeDto) {
    return this.masterService.createdescribe(dto);
  }
  @Put("describe/:id")
  @ApiOperation({ summary: "Update a Describe" })
  @ApiResponse({ status: 200, description: "Describe updated successfully", type: Describe })
  @ApiResponse({ status: 404, description: "Describe not found" })
  async updatedescribe(@Param("id") id: string, @Body() dto: CreateDescribeDto): Promise<Describe> {
    return this.masterService.updateDescribe(id, dto);
  }
  @Get("character")
  @ApiOperation({ summary: "Get all Character" })
  @ApiResponse({
    status: 200,
    description: "Returns an array of Character",
    type: Character,
    isArray: true,
  })
  async findAllCharacter() {
    try {
      const data = await this.masterService.findAllCharacter();
      return createSuccessResponse(HttpStatus.OK, "Character found successfully", data);
    } catch (error) {
      throw new NotFoundException(createErrorResponse(HttpStatus.NOT_FOUND, "Character not found"));
    }
  }
  @Post("character")
  @ApiOperation({ summary: "Create a new Character" })
  @ApiResponse({ status: 201, description: "Character created successfully", type: Character })
  @ApiResponse({ status: 409, description: "Character with the provided detail already exists" })
  async createdcharacter(@Body() dto: CreateCharacterDto) {
    return this.masterService.createCharacter(dto);
  }
  @Put("character/:id")
  @ApiOperation({ summary: "Update a Character" })
  @ApiResponse({ status: 200, description: "Character updated successfully", type: Character })
  @ApiResponse({ status: 404, description: "Character not found" })
  async updatecharacter(
    @Param("id") id: string,
    @Body() dto: CreateCharacterDto
  ): Promise<Character> {
    return this.masterService.updateCharacter(id, dto);
  }
}
