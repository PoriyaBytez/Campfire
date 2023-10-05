import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiParam, ApiConsumes } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { Profile } from "./profile.entity";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateProfileDto } from "./dto";
import { APIError, APIResponse } from "src/types/api";
@Controller("profiles")
@ApiTags("Profiles")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiResponse({ status: 200, description: "Returns all profiles", type: Profile, isArray: true })
  findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(":userId")
  @ApiResponse({ status: 200, description: "Returns a profile by ID", type: Profile })
  @ApiParam({ name: "userId", description: "Profile User ID" })
  findById(@Param("userId") userId: string): Promise<APIResponse | APIError> {
    const response = this.profileService.findById(userId);
    return response;
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor("images"))
  async createProfile(
    @Body() dto: CreateProfileDto,
    @UploadedFiles() images?: Express.Multer.File[]
  ) {
    return this.profileService.createProfile(dto, images);
  }

  @Put(":id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor("images"))
  @ApiResponse({ status: 200, description: "Updates a profile by ID", type: Profile })
  @ApiParam({ name: "id", description: "Profile ID" })
  update(
    @Param("id") id: string,
    @Body() updateProfileDto: CreateProfileDto,
    @UploadedFiles() images?: Express.Multer.File[]
  ): Promise<APIResponse | APIError> {
    return this.profileService.update(id, updateProfileDto, images);
  }

  @Delete(":id")
  @ApiResponse({ status: 200, description: "Deletes a profile by ID" })
  @ApiParam({ name: "id", description: "Profile ID" })
  delete(@Param("id") id: string): Promise<void> {
    return this.profileService.delete(id);
  }
}
