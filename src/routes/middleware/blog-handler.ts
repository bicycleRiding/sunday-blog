import { Next, Context } from "koa"
import { Types } from "mongoose"

export async function blogCreateHandler(
	ctx: Context,
	next: Next
) {
	ctx.verifyBody({
		title: {
			require: true
		},
		content: {
			require: true
		}
	})

	const { title, content } = ctx.request.body
	const content_id = Types.ObjectId()

	ctx.state.blog = {
		title,
		// author_id,
		content: content_id
	}

	ctx.state.blog_content = {
		_id: content_id,
		main: content
	}

	// await next()
}
