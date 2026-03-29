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
<<<<<<< HEAD
						package: 'account.v1',
						protoPath: PROTO_PATH.ACCOUNT,
						url: configService.get('AUTH_GRPC_URL'),
=======
						package: 'Account.v1',
						protoPath: PROTO_PATH.ACCOUNT,
						url: configService.get('Auth_GRPC_URL'),
>>>>>>> e3fd516a0513942d66b50b4e9d5b430446864dd3
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
