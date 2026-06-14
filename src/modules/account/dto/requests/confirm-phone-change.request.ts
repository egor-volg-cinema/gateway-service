import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString, Length, Matches } from 'class-validator'

export class ConfirmPhoneChangeRequest {
	@ApiProperty({
		description: 'New phone number',
		example: '+79912345678'
	})
	@IsNotEmpty()
	@Matches(/^\+?\d{10,15}$/)
	public phone: string

	@ApiProperty({
		example: '123456'
	})
	@IsNotEmpty()
	@Length(6, 6)
	@IsNumberString()
	public code: string
}
