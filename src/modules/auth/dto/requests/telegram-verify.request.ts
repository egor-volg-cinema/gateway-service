import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TelegramVerifyRequest {
	@ApiProperty({
		example: 'eyJpZCI6MTAzMjQ2MTg3NSwiZmlyc3RfbmF...'
	})
	@IsString()
	@IsNotEmpty()
	public telegramAuthResult: string
}
