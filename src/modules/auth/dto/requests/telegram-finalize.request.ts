import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { IsString } from 'class-validator'

export class TelegramFinalizeRequest {
	@ApiProperty({
		description: 'The Telegram login response data',
		example: 'vghj36qg6g3g6h3vg64vh3'
	})
	@IsString()
	@IsNotEmpty()
	public sessionId: string
}
