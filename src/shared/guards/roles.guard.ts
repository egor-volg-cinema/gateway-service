import { AccountClientGrpc } from '@modules/account/account.grpc'
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Role } from '@teacinema/contracts/gen/ts/account'
import { lastValueFrom } from 'rxjs'

import { ROLES_KEY } from '../decorators'

@Injectable()
export class RolesGuard implements CanActivate {
	public constructor(
		private readonly reflector: Reflector,
		private readonly accountClient: AccountClientGrpc
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (!required || required.length === 0) return true

		const request = context.switchToHttp().getRequest()
		const user = request.user

		if (!user) throw new ForbiddenException('User context missing')

		const account = await lastValueFrom(
			this.accountClient.getAccount({ id: user.id })
		)

		if (!required.includes(account.role))
			throw new ForbiddenException(
				'You do not have permission to access this action'
			)

		return true
	}
}
