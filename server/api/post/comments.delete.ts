import { Comment } from "~/server/models/comment.model";

export default defineWrappedResponseHandler(async (event) => {
  if (!event.context.userId)
    return createError({
      message: "Unauthorized",
      status: 401
    });

  const body = await readBody<{ commentId: string }>(event);

  return await Comment.deleteOne({ _id: body.commentId, user_id: event.context.userI });
});
