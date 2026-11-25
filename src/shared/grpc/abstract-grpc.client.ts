import { lastValueFrom, type Observable } from 'rxjs'

// gRPC-методы NestJS возвращают Observable<T> — этот тип достаёт T
type UnwrapObservable<U> = U extends Observable<infer R> ? R : U

export abstract class AbstractGrpcClient<T extends Record<string, any>> {
	// прокси-сервис gRPC, инициализируется наследником в onModuleInit
	protected service!: T

	// универсальный вызов метода сервиса: принимает имя метода и его payload,
	// возвращает Promise с развёрнутым типом ответа
	public call<K extends keyof T>(
		method: K,
		payload: Parameters<T[K]>[0]
	): Promise<UnwrapObservable<ReturnType<T[K]>>> {
		const methodFn = this.service[method] as (
			payload: Parameters<T[K]>[0]
		) => Observable<UnwrapObservable<ReturnType<T[K]>>>

		// lastValueFrom ждёт последнее значение Observable и резолвит Promise
		return lastValueFrom(methodFn(payload))
	}
}
