import Koa, { Middleware } from "koa"
import { IRouterParamContext } from "koa-router"
import { Model, Document } from "mongoose"

declare module "koa" {
	interface DefaultContext extends IRouterParamContext {
		apiSuccess<T = any>(status: number, data: T): void
		apiFail<T = any>(status: number, err: T): void
		config: () => Sunday.Configer
		model: Sunday.Modeler
		verifyBody(op: {
			[key: string]: Sunday.verifyBodyOp
		}): void
	}
}

declare class Sunday extends Koa {
	constructor(model: Sunday.Modeler)
	config?: Sunday.Configer
	useMiddlewareList(middlewares: Middleware[]): void
}

declare namespace Sunday {
	type MiddlewareList = Middleware[]
	interface MiddlewareHandler<T = any> {
		(options?: T): Middleware
	}

	interface Configer {
		port?: number
		userToken?: string
		secretKey?: string
	}

	interface Modeler {
		User: Model<Document>
		Author: Model<Document>
		Blog: Model<Document>
		BlogContent: Model<Document>
	}

	interface Controller {
		index?: Koa.Middleware
		show?: Koa.Middleware
		create?: Koa.Middleware
		update?: Koa.Middleware
		destroy?: Koa.Middleware
	}

	interface verifyBodyOp {
		require?: boolean
		default?: any
	}
}

export = Sunday
