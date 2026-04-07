import { applyDecorators, UseGuards } from '@nestjs/common'

import { RolesGuard } from '../guards'
import { AuthGuard } from '../guards/auth.guard'

import { Roles } from './roles.decorator'

export const Protected = (...roles: string[]) => {
	if (roles.length === 0) return applyDecorators(UseGuards(AuthGuard))

	return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
}
