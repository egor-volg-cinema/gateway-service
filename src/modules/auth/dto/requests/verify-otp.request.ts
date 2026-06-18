import { ApiProperty } from '@nestjs/swagger'
import { IdentifierValidator } from '@shared/validators'
import {
	IsEnum,
	IsNotEmpty,
	IsNumberString,
	IsString,
	Length,
	Validate
} from 'class-validator'

export class VerifyOtpRequest {
	@ApiProperty({
		example: '+79912345678'
	})
	@IsString()
	@Validate(IdentifierValidator)
	public identifier: string

	@ApiProperty({
		example: '123456'
	})
	@IsNotEmpty()
	@Length(6)
	@IsNumberString()
	public code: string

	@ApiProperty({
		example: 'phone',
		enum: ['phone', 'email']
	})
	@IsEnum(['phone', 'email'])
	public type: 'phone' | 'email'
}
