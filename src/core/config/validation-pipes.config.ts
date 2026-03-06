import { ValidationPipeOptions } from '@nestjs/common'

export function getValidationPipesConfig(): ValidationPipeOptions {
	return {
		transform: true,
		whitelist: true
	}
}
