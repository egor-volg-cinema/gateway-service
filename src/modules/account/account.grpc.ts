import {
	AccountServiceClient,
	GetAccountRequest
<<<<<<< HEAD
} from '@egorcolgcinema/contracts/gen/account'
=======
} from '@egorcolgcinema/contracts/gen/Account'
>>>>>>> e3fd516a0513942d66b50b4e9d5b430446864dd3
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class AccountClientGrpc implements OnModuleInit {
	private accountService: AccountServiceClient

	public constructor(
		@Inject('Account_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit(): void {
		this.accountService =
			this.client.getService<AccountServiceClient>('AccountService')
	}

	public getAccount(data: GetAccountRequest) {
		return this.accountService.getAccount(data)
	}
}
