import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches } from 'class-validator'

export class InitPhoneChangeRequest {
	@ApiProperty({
		description: 'New phone number',
		example: '+79912345678'
	})
	@IsNotEmpty()
	@Matches(/^\+?\d{10,15}$/)
	public phone: string
}
