import { Role } from '@egorcolgcinema/contracts/gen/Account'
import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'requires_roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
