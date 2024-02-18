import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  // email
  @IsNotEmpty({ message: 'email_IS_REQUIRED' })
  email: string;

  @IsNotEmpty({ message: 'password_IS_REQUIRED' })
  password: string;
}
