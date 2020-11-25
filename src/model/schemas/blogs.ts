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
		ref: "authors"
	},
	content: {
		type: Types.ObjectId,
		ref: "blog_contents"
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
