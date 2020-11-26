import { Document } from "mongoose"
import moment from "moment"
import { Context, Next } from "koa"
import { Controller } from "../../sunday/types"

class BlogController implements Controller {
	async index(ctx: Context, next: Next) {
		const blogs = await ctx.model.Blog.find()
		ctx.apiSuccess(200, blogs)
		await next()
	}
	async show(ctx: Context, next: Next) {
		const id: number = ctx.params.id
		const blog = await ctx.model.Blog.findById(id).populate(
			"author",
			{
				password: 0,
				blogs: 0
			}
		)
		if (!blog) {
			ctx.throw(400, "该博客未找到, 请确保id正确")
		} else {
			ctx.apiSuccess(200, blog)
		}
		await next()
	}
	async create(ctx: Context, next: Next) {
		const { title, author_id, content } = ctx.request.body
		const blog = await ctx.model.Blog.create({
			title,
			author: author_id,
			content
		})
		if (!blog) {
			ctx.throw(500, "博客创建失败")
		} else {
			ctx.apiSuccess(200, blog)
		}
		await next()
	}
	async update(ctx: Context, next: Next) {
		const id: number = ctx.params.id
		const { title, content } = ctx.request.body
		const newBlog = await ctx.model.Blog.findByIdAndUpdate(
			id,
			{
				title,
				content,
				update_time: moment().format(
					"dddd, MMMM Do YYYY, h:mm:ss a"
				)
			},
			{
				new: true,
				omitUndefined: true
			}
		)
		if (!newBlog) {
			ctx.throw(500, "更新博客失败, 请确保id正确")
		} else {
			ctx.apiSuccess(200, newBlog)
		}
		await next()
	}
	async destroy(ctx: Context, next: Next) {
		const id: number = ctx.params.id
		const blog = await ctx.model.Blog.findByIdAndDelete(id)
		if (blog) {
			ctx.state.blog = blog
			ctx.apiSuccess(200, "删除成功")
		} else {
			ctx.throw(400, "删除失败, 请确保id正确")
		}
		await next()
	}
	async findUser(ctx: Context, next: Next) {
		const author_id: number = ctx.request.body.author_id
		const author = await ctx.model.User.findById(author_id)
		if (author) {
			ctx.state.author = author
		} else {
			ctx.throw(400, "未找到该用户, 请确认id是否正确")
		}
		await next()
	}
	async addBlogToUser(ctx: Context, next: Next) {
		const blog = ctx.body.data
		const author = ctx.state.author as Document
		author
			.update({
				$push: {
					blogs: blog
				}
			})
			.catch(() => ctx.throw(500, "用户更新失败"))
		await next()
	}
	async deleteBlogToUser(ctx: Context, next: Next) {
		const blog: Document = ctx.state.blog
		const author_id = blog.get("author")
		await ctx.model.User.findByIdAndUpdate(author_id, {
			$pull: {
				blogs: blog.get("_id")
			}
		}).catch(() => ctx.throw(500, "删除数组失败"))
		await next()
	}
}

const blogController = new BlogController()

export default blogController
