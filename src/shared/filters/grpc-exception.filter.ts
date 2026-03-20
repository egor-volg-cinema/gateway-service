import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
	public catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		if (this.isGrpcException(exception)) {
			const status = exception.getStatus()

			return response.status(status).json({
				code: status,
				details: exception.details || 'Internal error'
			})
		}

		if (exception instanceof HttpException) {
			const status = exception.getStatus()

			return response.status(status).json({
				code: status,
				details: exception.message
			})
		}

		return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			code: HttpStatus.INTERNAL_SERVER_ERROR,
			details: 'Internal error'
		})
	}

	private isGrpcException(exception: any) {
		return (
			typeof exception === 'object' &&
			'code' in exception &&
			'details' in exception
		)
	}
}
