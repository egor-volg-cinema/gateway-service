import { ApiProperty } from '@nestjs/swagger'

export class UserResponse {
	@ApiProperty({
		description: 'User ID',
		example: '550e8400-e29b-41d4-a716-446655440000'
	})
	public id: string

	@ApiProperty({
		description: 'User display name',
		example: 'John Doe',
		required: false
	})
	public name: string

	@ApiProperty({
		description: 'Phone number',
		example: '+79991234567',
		required: false
	})
	public phone: string

	@ApiProperty({
		description: 'Email address',
		example: 'user@example.com',
		required: false
	})
	public email: string

	@ApiProperty({
		description: 'Avatar URL',
		example: 'https://cdn.example.com/avatars/550e8400.png',
		required: false
	})
	public avatar: string
}

export class GetMeResponse {
	@ApiProperty({
		description: 'Current user profile',
		type: UserResponse
	})
	public user: UserResponse
}
