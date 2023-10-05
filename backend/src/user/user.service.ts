import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }

  async create(dto: CreateUserDto) {
    const newDto: CreateUserDto = { ...dto };
    if (newDto.password) {
      newDto.password = await bcrypt.hash(newDto.password, 10);
    }
    const createdUser = new this.userModel(newDto);
    try {
      await createdUser.save();
      return createdUser;
    } catch (error) {
      return "Email alredy exist try with other email";
    }
  }

  async update(id: string, dto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException("User not found");
    }
  }
}
