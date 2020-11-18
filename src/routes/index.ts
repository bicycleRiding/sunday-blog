import { DefaultContext } from "koa"
import Router from "koa-router"
import authorsRouter from "./author"
import blogsRouter from "./blog"
import usersRouter from "./user"

const routerList: Router<any, DefaultContext>[] = [
	blogsRouter,
	usersRouter,
	authorsRouter
]

export default routerList
