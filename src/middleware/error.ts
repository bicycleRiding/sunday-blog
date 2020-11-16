import { MiddlewareHandler } from "../sunday/types"

interface ErrorOptions {
	errorGoUp?: boolean
}

const errorHandler: MiddlewareHandler<ErrorOptions> = (
	options = {}
) => {
	const { errorGoUp = false } = options
	return async (ctx, next) => {
		try {
			await next()

			const { status, body } = ctx
			const isNotFound = status === 404 || !body

			if (isNotFound) {
				ctx.status = 404
				ctx.apiSuccess(404, "资源未找到")
			}
		} catch (err) {
			let { status = 500, message } = err

			// 生产模式下的错误兼容
			const isProd = ctx.app.env === "prod"
			const isServerError = status === 500
			const isProdServerError = isProd && isServerError
			if (isProdServerError) {
				message = "服务端错误, 修复中请稍后访问"
			}

			// 错误处理
			ctx.status = status
			ctx.apiFail(status, message)

			if (errorGoUp) {
				ctx.throw(status, message)
			}
		}
	}
}

export default errorHandler
