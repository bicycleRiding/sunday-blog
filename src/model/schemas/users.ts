import { Schema } from "mongoose"
import { createHmac } from "crypto"
import config from "../../config"

const usersSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		set(val: string) {
			const hamc = createHmac(
				"sha256",
				`${val}${config.secretKey}`
			)
			return hamc.digest("hex")
		}
	},
	sex: {
		type: String,
		enum: ["男", "女", "未知"],
		default: "未知"
	}
})

export { usersSchema }
