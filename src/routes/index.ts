import { DefaultContext } from "koa"
import Router from "koa-router"
import userRouter from "./user"
import blogRouter from "./blog"

const routerList: Router<any, DefaultContext>[] = [
	userRouter,
	blogRouter
]

export default routerList
