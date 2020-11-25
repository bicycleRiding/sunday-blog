import { Configer } from "./sunday/types"

const config: Configer = {}

config.port = 3000

config.cors = {
	origin(ctx) {
		const isDev = ctx.app.env === "dev"
		if (isDev) {
			return "http://localhost:8080"
		}
		return ""
	},
	maxAge: 600, // 预检请求的间隔为10分钟
	credentials: true // 允许客户端携带cookie
}

config.userToken = "ASDUJHWEUS#$@!12"

config.secretKey = "@!#^GYUDSA&(!@#2617"

export default config
