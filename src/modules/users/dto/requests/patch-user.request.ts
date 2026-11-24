import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PatchUserRequest {
	@ApiProperty({
		description: 'User display name',
		example: 'John Doe',
		required: false
	})
	@IsString()
	@IsNotEmpty()
	public name: string
}
