import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Profile } from "./profile.entity";
import { S3 } from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { CreateProfileDto } from "./dto";
import { APIError, APIResponse, createErrorResponse, createSuccessResponse } from "src/types/api";
@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private readonly profileModel: Model<Profile>) {}

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find();
  }

  async findById(id: string): Promise<APIResponse | APIError> {
    const profile = await this.profileModel.findOne({ userId: id }).exec();
    if (!profile) {
      return createErrorResponse(HttpStatus.BAD_REQUEST, "Profile not found with given user id.");
    }
    return createSuccessResponse(HttpStatus.OK, "Profile found", profile);
  }

  async createProfile(dto: CreateProfileDto, images?: Express.Multer.File[]): Promise<Profile> {
    if (images && images.length > 0) {
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
      });
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `${dto.userId}/Profile/${image.originalname}`,
            Body: image.buffer,
          };
          const result: ManagedUpload.SendData = await s3.upload(params).promise();
          return result.Location;
        })
      );

      dto.images = uploadedImages;
    }

    const createdProfile = new this.profileModel(dto);
    return createdProfile.save();
  }

  async update(
    id: string,
    dto: CreateProfileDto,
    images?: Express.Multer.File[]
  ): Promise<APIResponse | APIError> {
    if (images && images.length > 0) {
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
      });

      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `${id}/Profile/${image.originalname}`,
            Body: image.buffer,
          };
          const result: ManagedUpload.SendData = await s3.upload(params).promise();
          return result.Location;
        })
      );

      dto.images = uploadedImages;
    }

    console.log("DTOO", dto);

    const updatedProfile = await this.profileModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updatedProfile) {
      return createErrorResponse(HttpStatus.BAD_REQUEST, "No profile found.");
    }
    return createSuccessResponse(HttpStatus.OK, "Profile updated successfully.", updatedProfile);
  }

  async delete(id: string): Promise<void> {
    const result = await this.profileModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException("Profile not found");
    }
  }
}
