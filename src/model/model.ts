import { model } from "mongoose"

import { usersSchema } from "./schemas/users"
import { blogsSchema } from "./schemas/blogs"

const User = model("users", usersSchema)
const Blog = model("blogs", blogsSchema)

export { User, Blog }
