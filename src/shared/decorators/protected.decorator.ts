<<<<<<< HEAD
import { Role } from '@egorcolgcinema/contracts/gen/account'
=======
import { Role } from '@egorcolgcinema/contracts/gen/Account'
>>>>>>> e3fd516a0513942d66b50b4e9d5b430446864dd3
import { applyDecorators, UseGuards } from '@nestjs/common'

import { RolesGuard } from '../guards'
import { AuthGuard } from '../guards/auth.guard'

import { Roles } from './roles.decorator'

export const Protected = (...roles: Role[]) => {
	if (roles.length === 0) return applyDecorators(UseGuards(AuthGuard))

	return applyDecorators(Roles(...roles), UseGuards(RolesGuard, AuthGuard))
}
