import { Server } from "../src/app"
import { Configer } from "../src/sunday/types"

const { port } = (Server.config as Configer) || {
	port: 3000
}

Server.listen(port, () => console.log(`${port}服务已开启`))
