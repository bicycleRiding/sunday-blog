import Router from "koa-router"
import compose from "koa-compose"
import { MiddlewareHandler } from "../sunday/types"

type routesType = Router[]

const routesHandler: MiddlewareHandler<routesType> = (
	routerList = []
) => {
	const rootRouter = new Router()
	// 路由注册
	const mapRoutes = (router: Router) => router.routes()
	const routesList = routerList.map(mapRoutes)
	rootRouter.use(...routesList)

	return compose([
		rootRouter.routes(),
		rootRouter.allowedMethods()
	])
}

export default routesHandler
