import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { createErrorResponse } from "src/types/api";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const msg = (exception.getResponse() as any)?.message?.[0] || "Bad Request";
    response
      .status(status)
      // you can manipulate the response here
      .json(createErrorResponse(HttpStatus.BAD_REQUEST, msg));
  }
}
