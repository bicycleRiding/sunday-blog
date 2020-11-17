import { DefaultContext } from "koa"
import Router from "koa-router"
import userController from "../controller/users"
import usersController from "../controller/users"
import { userCreateHandler } from "./middleware/user-handler"

const usersRouter = new Router<any, DefaultContext>({
	prefix: "/users"
})

usersRouter.get("/", usersController.index)
usersRouter.get("/:id", usersController.show)
usersRouter.post(
	"/",
	userCreateHandler,
	usersController.create
)
usersRouter.put("/:id", usersController.update)
usersRouter.delete("/:id", userController.destroy)

export default usersRouter
