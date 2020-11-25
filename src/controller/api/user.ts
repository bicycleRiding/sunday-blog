import { Context, Next } from "koa"
import { Controller } from "../../sunday"

class UserController implements Controller {
	async index(ctx: Context, next: Next) {
		const users = await ctx.model.User.find().select(
			"-password"
		)
		ctx.apiSuccess(200, users)
		await next()
	}
	async show(ctx: Context, next: Next) {
		const id: number = ctx.params.id
		const user = await ctx.model.User.findOne({
			_id: id
		}).select("-password")
		if (!user) {
			ctx.throw(400, "该用户未找到, 请确认id是否正确")
		} else {
			ctx.apiSuccess(200, user)
		}
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
			ctx.throw(500, "用户创建失败")
		} else {
			ctx.apiSuccess(200, {
				_id: user.get("_id"),
				username: user.get("username"),
				sex: user.get("sex"),
				blogs: user.get("blogs")
			})
		}
		await next()
	}
	// TODO 等待blog接口完成后补充
	async update(ctx: Context, next: Next) {
		const { username, password, sex } = ctx.request.body
		const id: number = ctx.params.id
		const user = await ctx.model.User.findByIdAndUpdate(
			id,
			{
				username,
				password,
				sex
			},
			{
				new: true,
				omitUndefined: true
			}
		)

		if (!user) {
			ctx.throw(500, "用户无法更新, 请确认id是否正确")
		} else {
			ctx.apiSuccess(200, user)
		}
	}
	async destroy(ctx: Context, next: Next) {
		const id: number = ctx.params.id
		const user = await ctx.model.User.findByIdAndDelete(id)
		if (user) {
			ctx.apiSuccess(200, "删除成功")
		} else {
			ctx.throw(400, "删除失败, 请确认id是否正确")
		}
		await next()
	}
}

const userController = new UserController()

export default userController
