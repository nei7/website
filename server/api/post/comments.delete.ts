import { Comment } from "~/server/models/comment.model";

export default defineWrappedResponseHandler(async (event) => {
  if (!event.context.userId)
    return createError({
      message: "Unauthorized",
      status: 401
    });

  const query = await getQuery<{ id: string }>(event);

  return await Comment.deleteOne({ _id: query.id, user_id: event.context.userId });
});
