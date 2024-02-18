import {
  BadRequestException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class DatabaseExceptionService {
  constructor(code: string, message: string) {
    switch (code) {
      case '23505':
        return new UnprocessableEntityException({
          message: 'TRY_TO_ENTER_DUPLICATE_ENTRY',
        });
      case '23503':
        return new BadRequestException({
          message: 'INVALID_PAYLOAD_FOR_FORIGEN_KEY',
        });
      default:
        return new InternalServerErrorException({ message });
    }
  }
}
