import { Middleware } from "koa"

export const userCreateValidator: Middleware = async (
	ctx,
	next
) => {
	ctx.verifyBody({
		username: {
			require: true
		},
		password: {
			require: true
		},
		sex: {
			default: "未知"
		}
	})

	await next()
}

export const blogCreateValidator: Middleware = async (
	ctx,
	next
) => {
	ctx.verifyBody({
		title: {
			require: true
		},
		author_id: {
			require: true
		}
	})

	await next()
}
