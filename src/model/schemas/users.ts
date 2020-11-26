import { Schema, Types } from "mongoose"
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
		enum: {
			values: ["男", "女", "未知"],
			message: "sex必须是男, 女或者是未知"
		},
		default: "未知"
	},
	blogs: [
		{
			type: Types.ObjectId,
			ref: "blogs"
		}
	]
})

export { usersSchema }
