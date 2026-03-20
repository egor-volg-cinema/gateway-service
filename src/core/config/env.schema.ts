import { z } from 'zod'

export const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),

	HTTP_PORT: z.coerce.number().min(1).max(65535).default(4000),

	HTTP_HOST: z.url().default('http://localhost:4000'),

	HTTP_CORS: z
		.string()
		.default('http://localhost:3000')
		.transform(val => val.split(',').map(s => s.trim())),

	AUTH_GRPC_URL: z
		.string()
		.regex(
			/^[\w.-]+:\d+$/,
			'Must be in format host:port (e.g., localhost:50051)'
		)
		.default('localhost:50051')
})

export type Env = z.infer<typeof envSchema>
