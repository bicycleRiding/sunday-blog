import { Next, Context } from "koa"
import jsonwebtoken from "jsonwebtoken"

export async function userCreateHandler(
	ctx: Context,
	next: Next
) {
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
		.then(() => {
			ctx.apiSuccess(200, {
				...ctx.body.data,
				token: jsonwebtoken.sign(
					ctx.body.data,
					<string>ctx.config().userToken,
					{ expiresIn: "7d" }
				)
			})
		})
		.catch(err => {
			const userDuplicateError = (err.message as string).includes(
				"E11000 duplicate key error collection"
			)
			if (userDuplicateError) {
				ctx.throw(400, "用户名重复, 请更换用户名")
			}
		})
}
