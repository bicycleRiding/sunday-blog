import { DefaultContext } from "koa"
import Router from "koa-router"
import userController from "../controller/api/user"
import {
	IDFormatError,
	duplicateRegisterErrorFormat
} from "./middleware/error-format"
import { userDataIncreaseToken } from "./middleware/data-process"
import { userCreateValidator } from "./middleware/validator"

const userRouter = new Router<any, DefaultContext>({
	prefix: "/users"
})

userRouter.get("/", userController.index)
userRouter.get("/:id", IDFormatError, userController.show)
userRouter.post(
	"/",
	userCreateValidator,
	duplicateRegisterErrorFormat,
	userController.create,
	userDataIncreaseToken
)
userRouter.put("/:id", IDFormatError, userController.update)
userRouter.delete(
	"/:id",
	IDFormatError,
	userController.destroy
)

export default userRouter
