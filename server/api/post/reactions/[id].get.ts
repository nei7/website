import { Reaction } from "~/server/models/reaction.model";

export default defineWrappedResponseHandler(async (event) => {
  const postId = getRouterParam(event, "id");
  if (!postId) return createError({ message: "Invalid postId", status: 400 });

  return await Reaction.findOne({ post_id: postId });
});
