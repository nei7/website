import { Comment } from "~/server/models/comment.model";

export default defineWrappedResponseHandler(async (event) => {
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
