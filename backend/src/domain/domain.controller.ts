import {
  Controller,
  Post,
  Body,
  Param,
  HttpStatus,
  Put,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
} from "@nestjs/common";
import { DomainService } from "./domain.service";
import { Domain } from "./domain.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { APIError, createErrorResponse, createSuccessResponse } from "src/types/api";
import { DomainRequest, FetchDomainRequest } from "./dto";

@ApiTags("Domain")
@Controller("domain")
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  // FUNCTION TO HANDLE CREATE DOMAIN REQUEST
  @Post()
  @ApiOperation({ summary: "Add domain to master" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Domain created successfully",
    type: Domain,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
    type: BadRequestException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal server error",
    type: InternalServerErrorException,
  })
  async createDomain(@Body() dto: DomainRequest) {
    const domain: Domain | APIError = await this.domainService.createDomain(dto);
    if (domain instanceof APIError) {
      throw new HttpException(
        createErrorResponse(domain.code, domain.message, domain.data),
        domain.code
      );
    }
    return createSuccessResponse(HttpStatus.CREATED, "Domain created successfully", domain);
  }

  // FUNCTION TO HANDLE CREATE DOMAIN REQUEST
  @Put(":id")
  @ApiOperation({ summary: "Function to update domain" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Domain updated successfully",
    type: Domain,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
    type: BadRequestException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal server error",
    type: InternalServerErrorException,
  })
  async updateDomain(@Body() dto: DomainRequest, @Param("id") id: string) {
    const response: Domain | APIError = await this.domainService.updateDomain(id, dto);
    if (response instanceof APIError) {
      throw new HttpException(
        createErrorResponse(response.code, response.message, response.data),
        response.code
      );
    }
    return createSuccessResponse(HttpStatus.OK, "Domain updated successfully", response);
  }

  // FUNCTION TO DELETE DOMAIN BY ID
  @Delete(":id")
  @ApiOperation({ summary: "Delete domain" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Domain deleted successfully",
    type: Domain,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
    type: BadRequestException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal server error",
    type: InternalServerErrorException,
  })
  async deleteDomain(@Param("id") id: string) {
    const response = await this.domainService.deleteDomain(id);
    if (response instanceof APIError) {
      throw new HttpException(
        createErrorResponse(response.code, response.message, response.data),
        response.code
      );
    }
    return createSuccessResponse(HttpStatus.OK, "Domain deleted successfully", response);
  }

  // FUNCTION TO GET THE DOMAIN BY ID OR NAME
  @Post("fetch-domain")
  @ApiOperation({ summary: "To fetch the domain based on ID or Name" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Domain retrieved successfully",
    type: Domain,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
    type: BadRequestException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal server error",
    type: InternalServerErrorException,
  })
  async fetchDomainByIdOrName(@Body() request: FetchDomainRequest) {
    const response: Domain | APIError = await this.domainService.getDomainByIdOrName(request);
    if (response instanceof APIError) {
      throw new HttpException(
        createErrorResponse(response.code, response.message, response.data),
        response.code
      );
    }

    return createSuccessResponse(HttpStatus.OK, "Domain retrieved successfully.", response);
  }

  // @Get(":name")
  // @ApiOperation({ summary: "Check Domain Exists Or Not " })
  // @ApiParam({ name: "name", description: "Domain name" })
  // async validateDomain(@Param("name") name: string) {
  //   const isValid = await this.domainService.checkDomainExists(name);
  //   return { isValid };
  // }

  // @Get("check-email/:email")
  // @ApiOperation({ summary: "Check Email Exists Or Not " })
  // @ApiResponse({ status: 200, description: "Checks if the email domain is verified" })
  // @ApiParam({ name: "email", description: "Email address" })
  // checkEmail(@Param("email") email: string) {
  //   return this.domainService.checkEmailDomain(email);
  // }

  // @Post("/check")
  // @ApiOperation({ summary: "Check email if not then send registration link" })
  // @ApiResponse({ description: "Email already exists in the database" })
  // @ApiResponse({ description: "Registration email sent" })
  // async checkEmail1(@Body() dto: EmailDto): Promise<APIResponse<any>> {
  //   const check = await this.domainService.service.findByEmail(dto.email);
  //   if (check) {
  //     return createErrorResponse(HttpStatus.CONFLICT, "Email ID Already exist.");
  //   }
  //   // if (this.domainService.checkEmailDomain(dto.email)) {
  //   //   return { message : 'Email already exists in the database'};
  //   // }
  //   await this.domainService.sendRegistrationEmail(dto.email);
  //   return createSuccessResponse(HttpStatus.OK, "Registration email sent.");
  // }
}
