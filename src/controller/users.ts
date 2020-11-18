import { Next, Context } from "koa"
import { Controller } from "../sunday/types"

class UserController implements Controller {
	async index(ctx: Context, next: Next) {
		const users = await ctx.model.User.find().select(
			"-password"
		)
		if (!users) {
			ctx.throw(500, "用户获取失败")
		}
		ctx.apiSuccess(200, users)
		await next()
	}
	async show(ctx: Context, next: Next) {
		const { id }: { id: string } = ctx.params
		const user = await ctx.model.User.findById(id)
			.select("-password")
			.catch(err => ctx.throw("用户未找到"))

		if (!user) {
			ctx.throw(400, "用户未找到")
		}

		ctx.apiSuccess(200, user)
		await next()
	}
	async create(ctx: Context, next: Next) {
		const { username, password, sex } = ctx.request.body
		const user = await ctx.model.User.create({
			username,
			password,
			sex
		})

		if (!user) {
			ctx.throw(500, "创建用户失败")
		}
		const author = await ctx.model.Author.create({
			user: user.get("_id")
		})
		if (!author) {
			ctx.throw(500, "创建作者失败")
		}
		ctx.apiSuccess(200, {
			_id: user.get("_id"),
			username: user.get("username"),
			sex: user.get("sex")
		})
		await next()
	}
	async update(ctx: Context, next: Next) {
		const id = ctx.params.id as string
		const { username, password, sex } = ctx.request.body
		const updatedUser = await ctx.model.User.findByIdAndUpdate(
			id,
			{
				username,
				password,
				sex
			},
			{
				omitUndefined: true,
				new: true
			}
		).catch(err => ctx.throw(500, "用户更新失败"))
		if (!updatedUser) {
			ctx.throw(400, "无法获取更新的用户, 请更新您的id")
		}
		ctx.apiSuccess(200, updatedUser)
		await next()
	}
	async destroy(ctx: Context, next: Next) {
		const id = ctx.params.id as string
		await ctx.model.User.findByIdAndDelete(id)
			.then(user => {
				if (user) {
					return ctx.model.Author.findByIdAndDelete(
						user._id
					)
				} else {
					ctx.throw(400, "用户已被删除, 请不要重复删除")
				}
			})
			.then(() => {
				ctx.apiSuccess(200, "用户删除成功")
			})
			.catch(err => {
				ctx.throw(500, err.message || "删除失败")
			})
		await next()
	}
}

const userController = new UserController()

export default userController
