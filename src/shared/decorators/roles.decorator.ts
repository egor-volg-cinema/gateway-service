<<<<<<< HEAD
import { Role } from '@egorcolgcinema/contracts/gen/account'
=======
import { Role } from '@egorcolgcinema/contracts/gen/Account'
>>>>>>> e3fd516a0513942d66b50b4e9d5b430446864dd3
import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'requires_roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
