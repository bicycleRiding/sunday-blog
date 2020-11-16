import Application from "koa"
import {
	Configer,
	MiddlewareList,
	Modeler,
	verifyBodyOp
} from "./types"

class Sunday extends Application {
	config?: Configer
	constructor(model: Modeler) {
		super()
		this.extendContext()
		this.context.model = model
	}
	useMiddlewareList(middlewareList: MiddlewareList) {
		middlewareList.forEach(this.use, this)
	}
	extendContext() {
		this.context.apiSuccess = function (status, data) {
			this.body = { msg: "success", data }
		}
		this.context.apiFail = function (status, err) {
			this.body = { msg: "fail", data: err }
		}
		this.context.config = this.config || {}
		this.context.verifyBody = function (options) {
			let { body } = this.request

			Object.keys(options).forEach(key => {
				// 校验必填项
				if (options[key].require) {
					this.assert(
						body[key],
						400,
						`${options[key]}为必填项`
					)
				}

				// 校验类型
				if (body[key]) {
					const isType =
						body[key] instanceof options[key].type
					this.assert(
						isType,
						400,
						`${key}类型错误, 应该为${options[key].type.name}`
					)
				}
				// 默认值
				this.request.body[key] =
					body[key] || options[key].default
			})
		}
	}
}

export default Sunday
