import { HttpStatus } from "@nestjs/common";

// export interface APIResponse<T> {
//   code: number;
//   message: string;
//   data?: T;
// }

export class APIError<T = unknown> {
  constructor(readonly code: HttpStatus, readonly message: string, readonly data?: T) {}
}

export class APIResponse<T = unknown> {
  constructor(readonly code: HttpStatus | number, readonly message: string, readonly data?: T) {}
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const createSuccessResponse = <T>(
  code = HttpStatus.OK,
  message = "Request processed successfully.",
  data?: T
): APIResponse<T> => new APIResponse<T>(code, message, data);

export const createErrorResponse = <T>(
  code = HttpStatus.BAD_REQUEST,
  message = "Something went wrong!",
  data?: T
): APIError<T> => new APIError<T>(code, message, data);
