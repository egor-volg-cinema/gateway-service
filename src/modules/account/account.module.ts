import { PROTO_PATH } from '@egorcolgcinema/contracts'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AccountController } from './account.controller'
import { AccountClientGrpc } from './account.grpc'

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
				name: 'ACCOUNT_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'account.v1',
						protoPath: PROTO_PATH.ACCOUNT,
						url: configService.getOrThrow<string>(
							'ACCOUNT_GRPC_URL'
						),
						loader: grpcLoader
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	controllers: [AccountController],
	providers: [AccountClientGrpc],
	exports: [AccountClientGrpc]
})
export class AccountModule {}
