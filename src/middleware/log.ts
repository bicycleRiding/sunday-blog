import { MiddlewareHandler } from "../sunday/types"

interface LogOptions {
	hasSuccessLog?: boolean
	hasFailLog?: boolean
}

const logHandler: MiddlewareHandler<LogOptions> = (
	options = {}
) => {
	const {
		hasSuccessLog = true,
		hasFailLog = true
	} = options
	return async (ctx, next) => {
		try {
			await next()
			if (hasSuccessLog) {
				ctx.app.emit("success", ctx.body, ctx)
			}
		} catch (err) {
			if (hasFailLog) {
				ctx.app.emit("fail", ctx.body, ctx)
			}
		}
	}
}

export default logHandler
