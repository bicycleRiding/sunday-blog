import jsonwebtoken from "jsonwebtoken"
import { Middleware } from "koa"

export const userDataIncreaseToken: Middleware = async (
	ctx,
	next
) => {
	const { data } = ctx.body
	const username = data.username
	const token = jsonwebtoken.sign(
		{
			username
		},
		<string>ctx.config().userToken,
		{
			expiresIn: "7d"
		}
	)
	data.token = token
	console.log(data)
	ctx.apiSuccess(200, data)
	await next()
}
