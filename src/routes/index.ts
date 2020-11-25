import { DefaultContext } from "koa"
import Router from "koa-router"
import userRouter from "./user"

const routerList: Router<any, DefaultContext>[] = [
	userRouter
]

export default routerList
