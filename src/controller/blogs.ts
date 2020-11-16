import { Context, Next } from "koa"
import { Controller } from "../sunday/types"

class BlogsController implements Controller {
	async index(ctx: Context, next: Next) {
		const blogs = await ctx.model.Blog.find().populate(
			"content"
		)
		ctx.apiSuccess(200, blogs)
		await next()
	}
	async create(ctx: Context, next: Next) {
		let blog = await ctx.model.Blog.create(ctx.state.blog)
		let blog_content = await ctx.model.BlogContent.create(
			ctx.state.blog_content
		)
		const res = {
			title: blog.get("title"),
			content: blog_content.get("main"),
			create_time: blog.get("create_time")
		}
		ctx.apiSuccess(200, res)
		await next()
	}
}

const blogsController = new BlogsController()

export default blogsController
