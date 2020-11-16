import { model } from "mongoose"

import { usersSchema } from "./schemas/users"
import { authorSchema } from "./schemas/author"
import {
	blogsSchema,
	blog_contentsSchema
} from "./schemas/blogs"

const User = model("users", usersSchema)
const Author = model("authors", authorSchema)
const Blog = model("blogs", blogsSchema)
const BlogContent = model(
	"blog_contents",
	blog_contentsSchema
)

export { User, Author, Blog, BlogContent }
