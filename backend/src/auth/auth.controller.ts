import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginRequest, RefreshTokenRequest, ValidateEmailRequest } from "./dto";
import { APIError, APIResponse, LoginResponse, createErrorResponse } from "src/types/api";
import { Request } from "express";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "User login with username and password" })
  @ApiResponse({ status: HttpStatus.OK, description: "Successfully logged in" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Invalid credentials" })
  async loginUser(@Body() loginRequest: LoginRequest) {
    try {
      const response: APIResponse<LoginResponse> = await this.authService.processLoginRequest(
        loginRequest
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  @Post("refreshToken")
  @ApiOperation({ summary: "Refresh Token if Access Token Expired" })
  @ApiResponse({ status: HttpStatus.OK, description: "refresh token given" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Invalid token" })
  async refreshToken(@Body() request: RefreshTokenRequest) {
    try {
      const response: APIResponse<LoginResponse> =
        await this.authService.processRefreshTokenRequest(request);
      return response;
    } catch (error) {
      return error;
    }
  }

  @Post("validate-email")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Validate email and initiate process" })
  @ApiResponse({ status: HttpStatus.OK, description: "Email validated" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "No Email Or Domain Verified." })
  async validateEmail(@Body() request: ValidateEmailRequest) {
    const response = await this.authService.processEmailValidationRequest(request);
    if (response instanceof APIError) {
      throw new HttpException(
        createErrorResponse(response.code, response.message, response.data),
        response.code
      );
    }
    console.log("FINALRES", response);
    return response;
  }

  @Post("resend-verification-email")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend verification email" })
  @ApiResponse({ status: HttpStatus.OK, description: "Email sent sucessfully." })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "No account found." })
  async resendVerificationEmail(@Body() request: ValidateEmailRequest) {
    const response = await this.authService.processResendEmailVerificationRequest(request);
    if (response instanceof APIError) {
      throw new HttpException(
        createErrorResponse(response.code, response.message, response.data),
        response.code
      );
    }
    return response;
  }

  @Post("join-waitlist")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "To join waitlist" })
  @ApiResponse({ status: HttpStatus.OK, description: "Join wait list successful." })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Not able to join wait list" })
  async joinwaitList(@Body() request: ValidateEmailRequest) {
    const response = await this.authService.processJoinWaitListRequest(request);
    if (response instanceof APIError) {
      throw new HttpException(
        createErrorResponse(response.code, response.message, response.data),
        response.code
      );
    }
    return response;
  }

  @Get("verify-email/:token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify Email with token given" })
  @ApiResponse({ status: HttpStatus.OK, description: "Email verified successfully" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized acess" })
  async verifyEmail(@Param("token") token: string, @Req() req: Request) {
    const response = await this.authService.processEmailVerificationRequest(token, req.ip);
    if (response instanceof APIError) {
      throw new HttpException(
        createErrorResponse(response.code, response.message, response.data),
        response.code
      );
    }
    return response;
  }
}
