import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { SendOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	@ApiOperation({
		summary: 'Send OTP code',
		description:
			'Sends a verification code to the user email or phone number.'
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public async sendOtp(@Body() dto: SendOtpRequest) {
		console.log('data:', dto)
		return {
			ok: true,
			message: `OTP sent to ${dto.type} ${dto.identifier}`
		}
	}
}
