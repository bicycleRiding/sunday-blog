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
		const user = await ctx.model.User.findByIdAndDelete(
			id
		).catch(err => {
			ctx.throw(500, "删除失败")
		})
		if (user) {
			ctx.apiSuccess(200, null)
		} else {
			ctx.throw(400, "删除失败, 无此用户")
		}

		await next()
	}
}

const userController = new UserController()

export default userController
