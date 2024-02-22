import { HttpException, HttpStatus } from '@nestjs/common';
import { messages } from './response.message';

/** Send Error Response */
export const errorResponse = (
  message: string = messages.SOMETHING_WRONG, // Default message
  status: number = HttpStatus.BAD_REQUEST, // Default status code
  data: any = {},
) => {
  return new HttpException(
    {
      message,
      status,
      data,
    },
    status,
  );
};

/** Send Success Response */
export const successResponse = (
  data: any = {},
  message: string = messages.SUCC,
  status: number = HttpStatus.OK,
) => ({
  status,
  message,
  data,
});
