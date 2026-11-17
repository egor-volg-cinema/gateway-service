import { PassportModule } from '@teacinema/passport'
import { AccountModule } from '@modules/account/account.module'
import { AuthModule } from '@modules/auth/auth.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getPassportConfig, validateEnv } from './config'

@Module({
	imports: [
		ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService]
		}),
		AuthModule,
		AccountModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
