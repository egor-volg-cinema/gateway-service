import { ConfigService } from '@nestjs/config'

export function getPassportConfig(configService: ConfigService) {
	return {
		secretKey: configService.get('PASSPORT_SECRET_KEY')
	}
}
