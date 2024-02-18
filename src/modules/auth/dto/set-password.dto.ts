import {
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SetPasswordDto {
  @IsNotEmpty({ message: 'email_IS_REQUIRED' })
  @IsNumberString({ no_symbols: true }, { message: 'email_MUST_BE_A_NUMBER' })
  @MaxLength(100, { message: 'email_MUST_BE_LESS_THAN_100_CHARS' })
  email: string;

  @IsNotEmpty({ message: 'password_IS_REQUIRED' })
  @MinLength(8, { message: 'password_MUST_BE_MORE_THAN_8_CHARS' })
  password: string;
}
