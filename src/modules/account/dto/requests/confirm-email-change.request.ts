import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator'

export class ConfirmEmailChangeRequest {
	@ApiProperty({
		description: 'New email address',
		example: 'newemail@example.com'
	})
	@IsNotEmpty()
	@IsEmail()
	public email: string

	@ApiProperty({
		example: '123456'
	})
	@IsNotEmpty()
	@Length(6, 6)
	@IsNumberString()
	public code: string
}
