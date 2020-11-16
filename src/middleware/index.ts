import bodyPaser from "koa-body"
import { MiddlewareList } from "../sunday/types"

import routerList from "../routes"
import errorHandler from "./error"
import logHandler from "./log"
import routesHandler from "./routes"

const front: MiddlewareList = [
	logHandler(),
	errorHandler({
		errorGoUp: true
	}),
	bodyPaser()
]

const dispatch: MiddlewareList = []

const behind: MiddlewareList = [routesHandler(routerList)]

const middlewareList: MiddlewareList = [
	front,
	dispatch,
	behind
].flat()

export default middlewareList
