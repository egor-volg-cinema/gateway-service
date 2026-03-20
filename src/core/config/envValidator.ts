import { Env, envSchema } from './env.schema'

export function validateEnv(config: Record<string, unknown>): Env {
	const parsed = envSchema.safeParse(config)

	if (!parsed.success) {
		const errors = parsed.error.issues
			.map(err => `  • ${err.path.join('.')}: ${err.message}`)
			.join('\n')

		throw new Error(
			`❌ Environment validation failed:\n${errors}\n` +
				`Please check your .env file`
		)
	}

	return parsed.data
}
