import { Schema, Types } from "mongoose"

const usersSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	sex: {
		type: String,
		enum: ["男", "女", "未知"],
		default: "未知"
	}
})

export { usersSchema }
