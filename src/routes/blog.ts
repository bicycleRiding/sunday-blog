import { DefaultContext } from "koa"
import Router from "koa-router"
import blogsController from "../controller/blogs"
import { blogCreateHandler } from "./middleware/blog-handler"

const blogsRouter = new Router<any, DefaultContext>({
	prefix: "/blogs"
})

// restful-api
blogsRouter.get("/", blogsController.index)
blogsRouter.post(
	"/",
	blogCreateHandler,
	blogsController.create
)

export default blogsRouter
