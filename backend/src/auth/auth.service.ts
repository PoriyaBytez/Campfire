import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../user/user.entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { LoginRequest, RefreshTokenRequest, ValidateEmailRequest } from "./dto";
import {
  APIError,
  APIResponse,
  LoginResponse,
  createErrorResponse,
  createSuccessResponse,
} from "src/types/api";
import { Domain } from "src/domain/domain.entity";
import { AppService } from "src/app.service";
import { Profile } from "src/profile/profile.entity";
import { OnboardingStep } from "src/utils/constants";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Domain.name) private readonly domainModel: Model<Domain>,
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
    private readonly appService: AppService
  ) {}

  async processLoginRequest(dto: LoginRequest): Promise<APIResponse<LoginResponse>> {
    const { email, password } = dto;
    // Check first email exist and user found with this email..
    const user: User = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException(
        createErrorResponse(HttpStatus.UNAUTHORIZED, "Please check your credential")
      );
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        createErrorResponse(HttpStatus.UNAUTHORIZED, "Please check your credential")
      );
    }

    // if email and password both valid then check does user account is active.
    if (!user.isVerified || user.isActive) {
      throw new UnauthorizedException(
        createErrorResponse(
          HttpStatus.UNAUTHORIZED,
          "Your account is not verified or active. please check with admin."
        )
      );
    }

    delete user.password;
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET
    );

    const response: LoginResponse = { accessToken, refreshToken };
    return createSuccessResponse(HttpStatus.OK, "You are successfully logged in.", response);
  }

  async processRefreshTokenRequest(dto: RefreshTokenRequest): Promise<APIResponse<LoginResponse>> {
    const { refreshToken } = dto;
    try {
      const decoded: jwt.JwtPayload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      ) as jwt.JwtPayload;
      const user = await this.userModel.findOne({ email: decoded.email });
      if (!user) {
        throw new UnauthorizedException(
          createErrorResponse(HttpStatus.UNAUTHORIZED, "Please check your credential")
        );
      }

      if (!user.isVerified || user.isActive) {
        throw new UnauthorizedException(
          createErrorResponse(
            HttpStatus.UNAUTHORIZED,
            "Your account is not verified or active. please check with admin."
          )
        );
      }
      delete user.password;
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
      const updatedRefershToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET
      );
      const tokenResponse: LoginResponse = { accessToken, refreshToken: updatedRefershToken };
      return createSuccessResponse(
        HttpStatus.OK,
        "Your tokens refreshed successfully",
        tokenResponse
      );
    } catch (error) {
      throw new UnauthorizedException(
        createErrorResponse(HttpStatus.UNAUTHORIZED, "Invalid refresh token")
      );
    }
  }

  async processEmailValidationRequest(
    request: ValidateEmailRequest
  ): Promise<APIResponse | APIError> {
    const { email } = request;
    if (!email) {
      return createErrorResponse(HttpStatus.BAD_REQUEST, "Please enter email address");
    }

    try {
      // first we will check does email ID is in our main user list or not if that user exist
      const userResponse = await this.userModel.findOne({ email: email }).exec();
      // if userFound with given ID means he has tried once registration or in whitelist.
      if (userResponse) {
        // if not whitelisted means already in Queue to wait.
        if (!userResponse.isVerified) {
          await this.sendVerificationEmail(email);
          return createSuccessResponse(HttpStatus.OK, "VERIFICATION_EMAIL_SENT");
        } else if (!userResponse.isWhitelist) {
          return createErrorResponse(HttpStatus.BAD_REQUEST, "IN_WHITELIST_QUEUE", userResponse);
        } else if (!userResponse.isActive) {
          return createErrorResponse(HttpStatus.BAD_REQUEST, "NOT_ACTIVATED", userResponse);
        } else {
          // get current profile status
          const profileData = await this.profileModel.findOne({ userId: userResponse._id }).exec();
          console.log("PROFILEDATA", profileData);
          return createSuccessResponse(HttpStatus.OK, "PROCESS_LOGIN", {
            user: userResponse,
            profile: profileData,
          });
        }
      } else {
        // now check if domain is whitelisted then we will straight create user and profile for that user with the whitelist true else we will create profile and user with whitelist false.
        const domain = email.split("@")[1];
        const domainResponse = await this.domainModel.findOne({ domainName: domain }).exec();
        if (domainResponse && domainResponse.isWhitelist && domainResponse.isActive) {
          const user = new this.userModel({
            email: email,
            isWhitelist: true,
            isActive: false,
            isVerified: false,
            profileStatus: OnboardingStep.INITIAL,
          });
          const userItem: User = await user.save();
          if (userItem) {
            // we will create a default profile for this user as well.
            const profile = new this.profileModel({
              userId: user._id,
            });
            await profile.save();
            await this.sendVerificationEmail(email);
            return createSuccessResponse(HttpStatus.OK, "VERIFICATION_EMAIL_SENT");
          }
        } else {
          return createErrorResponse(HttpStatus.BAD_REQUEST, "JOIN_WAITLIST");
        }
      }
    } catch (error) {
      return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong!", error);
    }
  }

  async processJoinWaitListRequest(request: ValidateEmailRequest): Promise<APIResponse | APIError> {
    const user = new this.userModel({
      email: request.email,
      isWhitelist: false,
      isActive: false,
      isVerified: false,
      profileStatus: OnboardingStep.INITIAL,
    });
    const userItem: User = await user.save();
    if (userItem) {
      // we will create a default profile for this user as well.
      const profile = new this.profileModel({
        userId: user._id,
      });
      await profile.save();
      await this.sendVerificationEmail(request.email);
      return createSuccessResponse(HttpStatus.OK, "VERIFICATION_EMAIL_SENT");
    }
  }

  async processResendEmailVerificationRequest(
    request: ValidateEmailRequest
  ): Promise<APIResponse | APIError> {
    const { email } = request;
    if (!email) {
      return createErrorResponse(HttpStatus.BAD_REQUEST, "Please enter email address");
    }
    try {
      const userResponse = await this.userModel.findOne({ email: email }).exec();
      if (!userResponse) {
        return createErrorResponse(HttpStatus.BAD_REQUEST, "No User found with given email");
      }

      await this.sendVerificationEmail(email);
      return createSuccessResponse(HttpStatus.OK, "Verification email sent successfully");
    } catch (error) {
      return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong!", error);
    }
  }

  async processEmailVerificationRequest(
    token: string,
    ipAddress: string
  ): Promise<APIResponse | APIError> {
    try {
      const decodeToken: jwt.JwtPayload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ) as jwt.JwtPayload;
      const email = decodeToken.email;

      // if given email found on email service then we have to make that verified true as well.
      const updatedObj = await this.userModel.findOneAndUpdate(
        { email: email },
        {
          $set: {
            ip: ipAddress,
            verificationTimestamp: Date.now(),
            timezone: "Asia/Kolkata",
            isVerified: true,
          },
        },
        { new: true }
      );
      delete updatedObj.password;
      return createSuccessResponse(
        HttpStatus.OK,
        "Email verification done successfully",
        updatedObj
      );
    } catch (error) {
      return createErrorResponse(HttpStatus.UNAUTHORIZED, "Token expired");
    }
  }

  async sendVerificationEmail(email: string) {
    // if record created successfully then we have to now send and email to verify with token creation for jwt.
    try {
      const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      await this.appService.emailVerification(email, "Email Verification Link", {
        token: token,
      });
      return "Email sent success";
    } catch (error) {
      return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong!");
    }
  }
}
