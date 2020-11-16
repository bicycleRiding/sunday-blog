import mongoose from "mongoose"
export * as Model from "./model"

mongoose.connect("mongodb://localhost/koa-blogs", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

mongoose.connection.on("open", () =>
	console.log("数据库已开启")
)
mongoose.connection.on("error", () =>
	console.log("数据库开启失败")
)
