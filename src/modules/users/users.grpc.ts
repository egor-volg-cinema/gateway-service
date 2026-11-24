import { Inject, Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import type {
	GetMeRequest,
	UsersServiceClient
} from '@teacinema/contracts/gen/ts/users'

@Injectable()
export class UsersClientGrpc {
	private usersService: UsersServiceClient

	public constructor(
		@Inject('USERS_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.usersService =
			this.client.getService<UsersServiceClient>('UsersService')
	}

	public getMe(request: GetMeRequest) {
		return this.usersService.getMe(request)
	}
}
