import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { CurrentUser, Protected } from '@shared/decorators'

import { PatchUserRequest } from './dto'
import { GetMeResponse } from './dto/responses'
import { UsersClientGrpc } from './users.grpc'

@Controller('users')
export class UsersController {
	public constructor(private readonly client: UsersClientGrpc) {}

	@ApiOperation({
		summary: 'Get current user',
		description: 'Returns authentificated user profile data'
	})
	@ApiOkResponse({
		type: GetMeResponse,
		description: 'Current user profile'
	})
	@ApiBearerAuth()
	@Protected()
	@Get('@me')
	@HttpCode(HttpStatus.OK)
	public getMe(@CurrentUser() userId: string) {
		return this.client.getMe({ id: userId })
	}

	@ApiOperation({
		summary: 'Update user',
		description: 'Updates user'
	})
	@ApiOkResponse({
		type: PatchUserRequest,
		description: 'User updated'
	})
	@ApiBearerAuth()
	@Protected()
	@Patch('@me')
	@HttpCode(HttpStatus.OK)
	public patchUser(
		@CurrentUser() userId: string,
		@Body() request: PatchUserRequest
	) {
		return this.client.patchUser({ userId, ...request })
	}
}
