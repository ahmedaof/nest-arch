import { IsNotEmpty, MinLength } from 'class-validator'

export class CheckPasswordDto {
	@IsNotEmpty({ message: 'password_IS_REQUIRED' })
	@MinLength(8, { message: 'password_MUST_BE_MORE_THAN_8_CHARS' })
	password: string
}
