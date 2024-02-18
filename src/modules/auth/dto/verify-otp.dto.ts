import { IsNotEmpty, IsNumberString, MaxLength, MinLength } from 'class-validator'

export class VerifyOtpDto {
	@IsNotEmpty({ message: 'phone_IS_REQUIRED' })
	@IsNumberString({}, { message: 'phone_IS_INVALID' })
	@MinLength(10, { message: 'phone_MUST_BE_10_DIGITS' })
	@MaxLength(10, { message: 'phone_MUST_BE_10_DIGITS' })
	phone: string

	@IsNotEmpty({ message: 'otp_IS_REQUIRED' })
	@MinLength(4, { message: 'otp_MUST_BE_4_NUMBERS' })
	@MaxLength(4, { message: 'otp_MUST_BE_4_NUMBERS' })
	otp: string
}
