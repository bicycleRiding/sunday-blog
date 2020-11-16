import { DefaultContext } from "koa"
import Router from "koa-router"
import blogsRouter from "./blog"

const routerList: Router<any, DefaultContext>[] = [
	blogsRouter
]

export default routerList
