import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import type { Request, Response } from 'express'
import { lastValueFrom } from 'rxjs'
import { CurrentUser, Protected } from 'src/shared/decorators'

import { AuthClientGrpc } from './auth.grpc'
import { SendOtpRequest, VerifyOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly client: AuthClientGrpc,
		private readonly configService: ConfigService
	) {}

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
	public async verifyOtp(
		@Body() dto: VerifyOtpRequest,
		@Res({ passthrough: true }) res: Response
	) {
		const { accessToken, refreshToken } = await lastValueFrom(
			this.client.verifyOtp(dto)
		)

		res.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			secure:
				this.configService.getOrThrow<string>('NODE_ENV') !==
				'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000
		})

		return { accessToken }
	}

	@ApiOperation({
		summary: 'Refresh access token',
		description: 'Renews access token using refresh token from cookies.'
	})
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	public async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshToken = req.cookies.refresh_token
		const { accessToken, refreshToken: newRefreshToken } =
			await lastValueFrom(this.client.refresh({ refreshToken }))

		res.cookie('refresh_token', newRefreshToken, {
			httpOnly: true,
			secure:
				this.configService.getOrThrow<string>('NODE_ENV') !==
				'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000
		})

		return { accessToken }
	}

	@ApiOperation({
		summary: 'Logout',
		description: 'Clears refresh token from cookies.'
	})
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public async logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('refresh_token', {
			httpOnly: true,
			secure:
				this.configService.getOrThrow<string>('NODE_ENV') !==
				'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 0,
			expires: new Date(0)
		})

		return { ok: true }
	}

	@ApiBearerAuth()
	@Protected()
	@Get('me')
	public async me(@CurrentUser() userId: string) {
		return { ok: true, userId: userId }
	}
}
