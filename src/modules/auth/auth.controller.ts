import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { AuthClientGrpc } from '../auth.grpc'

import { SendOtpRequest } from './dto'
import { VerifyOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	public constructor(private readonly client: AuthClientGrpc) {}

	@ApiOperation({
		summary: 'Send OTP code',
		description:
			'Sends a verification code to the user email or phone number.'
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public async sendOtp(@Body() dto: SendOtpRequest) {
		return this.client.sendOtp(dto)
	}

	@ApiOperation({
		summary: 'Verify OTP code',
		description:
			'Verifies a verification code sent to the user email or phone number.'
	})
	@Post('otp/verify')
	@HttpCode(HttpStatus.OK)
	public async verifyOtp(@Body() dto: VerifyOtpRequest) {
		return this.client.verifyOtp(dto)
	}
}
