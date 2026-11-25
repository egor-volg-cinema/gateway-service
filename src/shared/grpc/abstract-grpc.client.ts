import { OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { lastValueFrom, type Observable } from 'rxjs'

// gRPC-методы возвращают Observable<T> — этот тип достаёт T
type UnwrapObservable<U> = U extends Observable<infer R> ? R : U

// Базовый класс gRPC-клиентов. T — сгенерированный интерфейс клиента
// из @teacinema/contracts (например, AuthServiceClient), не класс-обёртка.
export abstract class AbstractGrpcClient<
	T extends Record<string, any>
> implements OnModuleInit {
	// Прокси gRPC-сервиса; остаётся protected — снаружи только call()
	protected service!: T

	protected constructor(
		private readonly client: ClientGrpc,
		private readonly serviceName: string
	) {}

	public onModuleInit() {
		this.service = this.client.getService<T>(this.serviceName)
	}

	// Вызов метода по имени: payload и тип ответа выводятся из сигнатуры T[K]
	public call<K extends keyof T>(
		method: K,
		payload: Parameters<T[K]>[0]
	): Promise<UnwrapObservable<ReturnType<T[K]>>> {
		const fn = this.service[method] as (
			payload: Parameters<T[K]>[0]
		) => Observable<UnwrapObservable<ReturnType<T[K]>>>

		return lastValueFrom(fn(payload))
	}
}
