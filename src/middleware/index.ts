import bodyPaser from "koa-body"
import cors from "koa2-cors"
import { MiddlewareList } from "../sunday/types"

import routerList from "../routes"
import errorHandler from "./error"
import logHandler from "./log"
import routesHandler from "./routes"
import config from "../config"

const front: MiddlewareList = [
	logHandler(),
	cors(config.cors),
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
