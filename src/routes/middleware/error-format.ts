import { Middleware } from "koa"

export const IDFormatError: Middleware = async (
	ctx,
	next
) => {
	try {
		await next()
	} catch (err) {
		const message: string = err.message
		const notFoundUser = message.includes(
			"Cast to ObjectId failed for value"
		)
		if (notFoundUser) {
			ctx.throw(400, "id格式错误, 请携带正确id")
		} else {
			ctx.throw(500, err.message)
		}
	}
}

export const duplicateRegisterErrorFormat: Middleware = async (
	ctx,
	next
) => {
	try {
		await next()
	} catch (err) {
		const message: string = err.message
		const RepeatUser = message.includes(
			"E11000 duplicate key error collection"
		)
		if (RepeatUser) {
			ctx.throw(400, "该用户已被注册, 请更换用户名")
		} else {
			ctx.throw(500, err.message)
		}
	}
}
