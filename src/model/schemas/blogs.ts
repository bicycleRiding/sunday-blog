import { Schema, Types } from "mongoose"
import moment from "moment"

const blogsSchema = new Schema({
	title: {
		type: String,
		required: true,
		index: true
	},
	author: {
		type: Types.ObjectId,
		ref: "users" // 标识去哪个集合里边找
	},
	content: {
		type: String,
		default: ""
	},
	create_time: {
		type: String,
		default: () =>
			moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
	},
	update_time: {
		type: String
	}
})

export { blogsSchema }
