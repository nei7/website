import { IComment, Comment } from "~/server/models/comment.model";

type Body = Omit<IComment, "user_id">;

export default defineWrappedResponseHandler(async (event) => {
  if (!event.context.userId)
    return createError({
      message: "Unauthorized",
      status: 401
    });

  const body = await readBody<Body>(event);

  const comment = new Comment({ ...body, user_id: event.context.userId });

  return comment.save();
});
