import { Injectable, OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@teacinema/common'
import type { AuthServiceClient } from '@teacinema/contracts/gen/ts/auth'

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
	private svc: AuthServiceClient

	public constructor(
		@InjectGrpcClient('AUTH_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit(): void {
		this.svc = this.client.getService<AuthServiceClient>('AuthService')
	}

	public get service() {
		return this.svc
	}
}
