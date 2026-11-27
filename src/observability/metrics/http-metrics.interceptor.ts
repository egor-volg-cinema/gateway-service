import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor
} from '@nestjs/common'
import { InjectMetric } from '@willsoto/nestjs-prometheus'
import type { Request, Response } from 'express'
import type { Counter, Gauge, Histogram } from 'prom-client'
import { finalize, type Observable } from 'rxjs'

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
	private readonly SERVICE_NAME: string

	private getRoute(req: Request): string {
		const route: unknown = req.route

		if (
			typeof route === 'object' &&
			route !== null &&
			'path' in route &&
			typeof route.path === 'string'
		) {
			return route.path
		}

		return 'unknown'
	}

	public constructor(
		@InjectMetric('http_request_duration_seconds')
		private readonly histogram: Histogram<string>,
		@InjectMetric('http_requests_in_progress')
		private readonly inProcess: Gauge<string>,
		@InjectMetric('http_requests_total')
		private readonly counter: Counter<string>
	) {
		this.SERVICE_NAME = 'gateway'
	}

	public intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Observable<any> {
		const req = context.switchToHttp().getRequest<Request>()
		const res = context.switchToHttp().getResponse<Response>()
		const method = req.method
		const route: string = this.getRoute(req)

		this.inProcess.inc({ service: this.SERVICE_NAME })

		const endTimer = this.histogram.startTimer()

		return next.handle().pipe(
			finalize(() => {
				const status_code = res.statusCode.toString()

				this.counter.inc({
					service: this.SERVICE_NAME,
					method,
					route,
					status_code
				})

				endTimer({
					service: this.SERVICE_NAME,
					method,
					route,
					status_code
				})

				this.inProcess.dec({ service: this.SERVICE_NAME })
			})
		)
	}
}
