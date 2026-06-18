import { SendOtpRequest } from '@modules/auth/dto'
import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'identifierValidator', async: false })
export class IdentifierValidator implements ValidatorConstraintInterface {
	public validate(value: string, args: ValidationArguments): boolean {
		const obj = args.object as SendOtpRequest

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const phoneRegex = /^\+?\d{10,15}$/

		if (obj.type === 'email') {
			return typeof value === 'string' && emailRegex.test(value)
		} else if (obj.type === 'phone') {
			return typeof value === 'string' && phoneRegex.test(value)
		}

		return false
	}

	public defaultMessage(args: ValidationArguments): string {
		const obj = args.object as SendOtpRequest

		if (obj.type === 'email')
			return 'Identifier must be a valid email address.'
		if (obj.type === 'phone')
			return 'Identifier must be a valid phone number.'

		return 'invalid identifier type.'
	}
}
