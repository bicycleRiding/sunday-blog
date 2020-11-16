import { Model } from "./model"
import config from "./config"
import middlewareList from "./middleware"
import Sunday from "./sunday"
import { Context } from "koa"

const app = new Sunday(Model)

app.useMiddlewareList(middlewareList)

app.on("success", (body, ctx: Context) => {
	const { status, data } = body
	console.log("status", status || ctx.status)
	console.log("successResponse", data)
})

app.on("fail", (body, ctx: Context) => {
	const { status, data } = body
	console.log("status", status || ctx.status)
	console.error("FailResponse", data)
})

app.config = config

export { app as Server }
