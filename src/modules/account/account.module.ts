import { PROTO_PATH } from '@egorcolgcinema/contracts'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

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
				name: 'Account_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'Account.v1',
						protoPath: PROTO_PATH.ACCOUNT,
						url: configService.get('Auth_GRPC_URL'),
						loader: grpcLoader
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	providers: [AccountClientGrpc],
	exports: [AccountClientGrpc]
})
export class AccountModule {}
