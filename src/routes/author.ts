import { DefaultContext } from "koa"
import Router from "koa-router"
import authorsController from "../controller/authors"

const authorsRouter = new Router<any, DefaultContext>({
	prefix: "/authors"
})

authorsRouter.get("/", authorsController.index)
authorsRouter.get("/:id", authorsController.show)

export default authorsRouter
