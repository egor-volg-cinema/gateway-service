import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { AbstractGrpcClient } from '@shared/grpc'
import { InjectGrpcClient } from '@teacinema/common'
import type { AccountServiceClient } from '@teacinema/contracts/gen/ts/account'

@Injectable()
export class AccountClientGrpc extends AbstractGrpcClient<AccountServiceClient> {
	public constructor(
		@InjectGrpcClient('ACCOUNT_PACKAGE') client: ClientGrpc
	) {
		super(client, 'AccountService')
	}
}
