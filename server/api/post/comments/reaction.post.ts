import { Comment } from "~/server/models/comment.model";

export default defineWrappedResponseHandler(async (event) => {
  if (!event.context.userId)
    return createError({
      message: "Unauthorized",
      status: 401
    });

  const { commentId } = getQuery(event);
  if (!commentId)
    return createError({
      message: "postId is required",
      status: 400
    });

  return await Comment.findOneAndUpdate(
    { _id: commentId },
    {
      $inc: {
        loved: 1
      }
    }
  );
});
