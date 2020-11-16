import { Schema, Types } from "mongoose"

const authorSchema = new Schema({
	user: {
		type: Types.ObjectId,
		ref: "users"
	},
	blogs: [
		{
			type: Types.ObjectId,
			ref: "blogs"
		}
	]
})

export { authorSchema }
