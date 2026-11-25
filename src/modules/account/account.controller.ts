import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { CurrentUser, Protected } from '@shared/decorators'

import { AccountClientGrpc } from './account.grpc'
import {
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	InitEmailChangeRequest,
	InitPhoneChangeRequest
} from './dto'

@Controller('account')
export class AccountController {
	public constructor(private readonly client: AccountClientGrpc) {}

	// Email change endpoints
	@ApiOperation({
		summary: 'Initiate email change process',
		description:
			'Sends a code to the new email address and returns a token for confirming the change.'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('email/init')
	@HttpCode(HttpStatus.OK)
	public initEmailChange(
		@Body() dto: InitEmailChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.call('initEmailChange', { ...dto, userId })
	}

	@ApiOperation({
		summary: 'Confirm email change',
		description:
			'Confirm the email change using the code sent to the new email address.'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('email/confirm')
	@HttpCode(HttpStatus.OK)
	public confirmEmailChange(
		@Body() dto: ConfirmEmailChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.call('confirmEmailChange', { ...dto, userId })
	}

	// Phone change endpoints
	@ApiOperation({
		summary: 'Initiate phone change process',
		description:
			'Sends a code to the new phone number and returns a token for confirming the change.'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('phone/init')
	@HttpCode(HttpStatus.OK)
	public initPhoneChange(
		@Body() dto: InitPhoneChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.call('initPhoneChange', { ...dto, userId })
	}

	@ApiOperation({
		summary: 'Confirm phone change',
		description:
			'Confirms the phone change using the code sent to the new phone number.'
	})
	@ApiBearerAuth()
	@Protected()
	@Post('phone/confirm')
	@HttpCode(HttpStatus.OK)
	public confirmPhoneChange(
		@Body() dto: ConfirmPhoneChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.call('confirmPhoneChange', { ...dto, userId })
	}
}
