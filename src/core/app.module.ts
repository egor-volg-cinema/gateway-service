import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from 'src/modules/auth/auth.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { validateEnv } from './config'

@Module({
	imports: [
		ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
