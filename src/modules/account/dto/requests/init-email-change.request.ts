import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class InitEmailChangeRequest {
	@ApiProperty({
		description: 'New email address',
		example: 'newemail@example.com'
	})
	@IsNotEmpty()
	@IsEmail()
	public email: string
}
