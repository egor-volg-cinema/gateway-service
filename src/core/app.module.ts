 
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AccountModule } from 'src/modules/account/account.module'
import { AuthModule } from 'src/modules/auth/auth.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getPassportConfig, validateEnv } from './config'
import { PassportModule } from '@egorcolgcinema/passport'

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
