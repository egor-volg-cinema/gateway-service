import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import { AppModule } from './core/app.module'
import { getValidationPipesConfig } from './core/config'
import { getCorsConfig } from './core/config/cors.config'
import { GrpcExceptionFilter } from './shared/filters'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)
	const logger = new Logger()

	const secret = config.get('COOKIES_SECRET')
	app.use(cookieParser(secret))

	app.useGlobalPipes(new ValidationPipe(getValidationPipesConfig()))
	app.useGlobalFilters(new GrpcExceptionFilter())

	app.enableCors(getCorsConfig(config))

	const swaggerConfig = new DocumentBuilder()
		.setTitle('EgorColgcinema API')
		.setDescription('API documentation for the Gateway Service')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('/docs', app, swaggerDocument, {
		yamlDocumentUrl: '/openapi.yaml'
	})

	const port = config.get('HTTP_PORT')
	const host = config.get('HTTP_HOST')

	await app.listen(port)

	logger.log(`Server running on ${host}`)
	logger.log(`Swagger running on ${host}/docs`)
}

bootstrap()
