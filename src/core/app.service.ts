import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	public getHello() {
		return {
			message: 'Hello World!'
		}
	}

	public getHealth() {
		return {
			status: 'ok',
			timestamp: new Date().toISOString()
		}
	}
}
