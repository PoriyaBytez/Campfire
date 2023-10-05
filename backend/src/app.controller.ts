import { Controller, Get, HttpStatus } from "@nestjs/common";
import { createSuccessResponse } from "./types/api";

@Controller()
export class AppController {
  @Get(["/", "/health"])
  async checkHealth() {
    return createSuccessResponse(HttpStatus.OK, "Backend service is UP.");
  }
}
