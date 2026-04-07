import { PROTO_PATH } from '@egorcolgcinema/contracts'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AccountModule } from '../account/account.module'

import { AuthController } from './auth.controller'
import { AuthClientGrpc } from './auth.grpc'

const grpcLoader = {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
}

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'AUTH_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'auth.v1',
						protoPath: PROTO_PATH.AUTH,
						url: configService.getOrThrow<string>('AUTH_GRPC_URL'),
						loader: grpcLoader
					}
				}),
				inject: [ConfigService]
			}
		]),
		AccountModule
	],
	controllers: [AuthController],
	providers: [AuthClientGrpc]
})
export class AuthModule {}
