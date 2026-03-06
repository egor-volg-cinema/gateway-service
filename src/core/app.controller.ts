import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { AppService } from './app.service'
import { HealthResponse } from './dto'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({
		summary: 'Hello World!',
		description: 'Returns a greeting message.'
	})
	@Get()
	public getHello() {
		return this.appService.getHello()
	}

	@ApiOperation({
		summary: 'Health check',
		description: 'Returns the health status of the application.'
	})
	@ApiOkResponse({
		description: 'The application is healthy.',
		type: HealthResponse
	})
	@Get('health')
	public health() {
		return this.appService.getHealth()
	}
}
