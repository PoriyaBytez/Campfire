import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ConflictException,
  NotFoundException,
  HttpStatus,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto";
import { createErrorResponse, createSuccessResponse } from "src/types/api";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Returns an array of users", type: User, isArray: true })
  async findAll() {
    try {
      const data = await this.userService.findAll();
      return createSuccessResponse(HttpStatus.OK, "Users found successfully", data);
    } catch (error) {
      throw new NotFoundException(createErrorResponse(HttpStatus.NOT_FOUND, "User not found"));
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiResponse({ status: 200, description: "Returns the user", type: User })
  @ApiResponse({ status: 404, description: "User not found" })
  async findById(@Param("id") id: string) {
    try {
      const data = await this.userService.findById(id);
      return createSuccessResponse(HttpStatus.OK, "User found successfully", data);
    } catch (error) {
      throw new NotFoundException(createErrorResponse(HttpStatus.NOT_FOUND, "User not found"));
    }
  }

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully", type: User })
  @ApiResponse({ status: 409, description: "User with the provided email already exists" })
  async create(@Body() dto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException(
        "User with the provided email already exists. Please try with a different email."
      );
    }
    return this.userService.create(dto);
  }
  @Put(":id")
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({ status: 200, description: "User updated successfully", type: User })
  @ApiResponse({ status: 404, description: "User not found" })
  async update(@Param("id") id: string, @Body() dto: CreateUserDto): Promise<User> {
    return this.userService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 204, description: "User deleted successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  async delete(@Param("id") id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
