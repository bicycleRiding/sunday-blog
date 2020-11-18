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
		},
		author_id: {
			require: true
		}
	})

	const { title, content, author_id } = ctx.request.body
	const content_id = Types.ObjectId()

	ctx.state.blog = {
		title,
		content: content_id,
		author_id
	}

	ctx.state.blog_content = {
		_id: content_id,
		main: content
	}
	await next()
}
