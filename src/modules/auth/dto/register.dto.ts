import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'name_IS_REQUIRED' })
  name: string;

  // email
  @IsNotEmpty({ message: 'email_IS_REQUIRED' })
  @IsEmail({}, { message: 'email_MUST_BE_A_VALID_EMAIL' })
  @MaxLength(100, { message: 'email_MUST_BE_LESS_THAN_100_CHARS' })
  email: string;

  // password
  @IsNotEmpty({ message: 'password_IS_REQUIRED' })
  password: string;
}
