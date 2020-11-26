import { DefaultContext } from "koa"
import Router from "koa-router"
import blogController from "../controller/api/blog"
import { IDFormatError } from "./middleware/error-format"
import { blogCreateValidator } from "./middleware/validator"

const blogRouter = new Router<any, DefaultContext>({
	prefix: "/blogs"
})

blogRouter.get("/", blogController.index)
blogRouter.get("/:id", IDFormatError, blogController.show)
blogRouter.post(
	"/",
	blogCreateValidator,
	blogController.findUser,
	blogController.create,
	blogController.addBlogToUser
)
blogRouter.put("/:id", blogController.update)
blogRouter.delete(
	"/:id",
	blogController.destroy,
	blogController.deleteBlogToUser
)

export default blogRouter
