import { Context, Next } from "koa"
import { Controller } from "../sunday/types"

class AuthorsController implements Controller {
	async index(ctx: Context, next: Next) {
		const authors = await ctx.model.Author.find()
			.populate("user")
			.populate("blogs")
		ctx.apiSuccess(200, authors)
		await next()
	}
	async show(ctx: Context, next: Next) {
		const id: number = ctx.params.id
		const author = await ctx.model.Author.findById(id)
			.populate("user")
			.populate("blogs")
		if (author) {
			ctx.apiSuccess(200, author)
		} else {
			ctx.throw(400, "无法获取作者")
		}
		await next()
	}
}

const authorsController = new AuthorsController()

export default authorsController
