import { Comment } from "~/server/models/comment.model";

export default defineWrappedResponseHandler(async (event) => {
  const query = getQuery(event);

  return await Comment.find({ post_id: query.postId });
});
