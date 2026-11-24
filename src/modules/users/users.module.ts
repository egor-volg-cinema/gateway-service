import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PROTO_PATHS } from '@teacinema/contracts'

import { UsersController } from './users.controller'
import { UsersClientGrpc } from './users.grpc'

const grpcLoader = {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: false
}

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'USERS_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'users.v1',
						protoPath: PROTO_PATHS.USERS,
						url: configService.getOrThrow<string>('USERS_GRPC_URL'),
						loader: grpcLoader
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	controllers: [UsersController],
	providers: [UsersClientGrpc],
	exports: [UsersClientGrpc]
})
export class UsersModule {}
