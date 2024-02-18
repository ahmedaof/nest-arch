import { IsNotEmpty, IsNumberString, MaxLength, MinLength } from 'class-validator'

export class ResendOtpDto {
	@IsNotEmpty({ message: 'phone_IS_REQUIRED' })
	@IsNumberString({}, { message: 'phone_IS_INVALID' })
	@MinLength(10, { message: 'phone_MUST_BE_10_DIGITS' })
	@MaxLength(10, { message: 'phone_MUST_BE_10_DIGITS' })
	phone: string
}
