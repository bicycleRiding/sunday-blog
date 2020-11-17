import { DefaultContext } from "koa"
import Router from "koa-router"
import blogsRouter from "./blog"
import usersRouter from "./user"

const routerList: Router<any, DefaultContext>[] = [
	blogsRouter,
	usersRouter
]

export default routerList
