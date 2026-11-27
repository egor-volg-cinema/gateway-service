import { Global, Module } from '@nestjs/common'
import {
	makeCounterProvider,
	makeGaugeProvider,
	makeHistogramProvider,
	PrometheusModule
} from '@willsoto/nestjs-prometheus'

import { HttpMetricsInterceptor } from './http-metrics.interceptor'

@Global()
@Module({
	imports: [
		PrometheusModule.register({
			path: '/metrics',
			defaultMetrics: { enabled: true }
		})
	],
	providers: [
		makeHistogramProvider({
			name: 'http_request_duration_seconds',
			help: 'HTTP request duration in seconds',
			labelNames: ['service', 'method', 'route', 'status_code'],
			buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10]
		}),
		makeGaugeProvider({
			name: 'http_requests_in_progress',
			help: 'Number of HTTP requests in progress',
			labelNames: ['service']
		}),
		makeCounterProvider({
			name: 'http_requests_total',
			help: 'Total number of HTTP requests',
			labelNames: ['service', 'method', 'route', 'status_code']
		}),
		HttpMetricsInterceptor,
		{
			provide: 'APP_INTERCEPTOR',
			useClass: HttpMetricsInterceptor
		}
	]
})
export class MetricsModule {}
