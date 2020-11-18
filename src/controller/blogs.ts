import { Context, Next } from "koa"
import { Controller } from "../sunday/types"

class BlogsController implements Controller {
	async index(ctx: Context, next: Next) {
		const blogs = await ctx.model.Blog.find().populate(
			"author"
		)
		ctx.apiSuccess(200, blogs)
		await next()
	}
	async show(ctx: Context, next: Next) {
		const id: number = ctx.params.id
		const blog = await ctx.model.Blog.findById(id)
		if (blog) {
			ctx.apiSuccess(200, blog)
		} else {
			ctx.throw(400, "无法获取该用户")
		}
		await next()
	}
	async create(ctx: Context, next: Next) {
		// const { title, content, author_id } = ctx.state.blog
		// let author
		// try {
		// 	author = await ctx.model.Author.findById(author_id)
		// } catch (err) {
		// 	ctx.throw(400, "无法找到作者")
		// }

		// if (!author) ctx.throw(400, "无法找到作者")

		// const blog = await ctx.model.Blog.create({
		// 	title,
		// 	content,
		// 	author
		// })
		// if (!blog) ctx.throw(500, "创建博客错误")
		// const { _id: content_id, main } = ctx.state.blog_content
		// const blogContent = await ctx.model.BlogContent.create({
		// 	_id: content_id,
		// 	main
		// })

		// if (!blogContent) ctx.throw(500, "创建博客失败")
		// const res = { blog, content: blogContent.get("main") }

		// ctx.apiSuccess(200, res)
		await next()
	}
	async update(ctx: Context, next: Next) {
		await next()
	}
	async destroy(ctx: Context, next: Next) {
		await next()
	}
}

const blogsController = new BlogsController()

export default blogsController
