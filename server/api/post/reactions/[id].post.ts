import { Reaction } from "~/server/models/reaction.model";

export default defineWrappedResponseHandler(async (event) => {
  const postId = getRouterParam(event, "id");
  if (!postId) return createError({ message: "Invalid postId", status: 400 });
  const body = await readBody<{ reaction: "thumbup" | "skull" | "heart"; type: "increment" | "decrement" }>(event);

  let reaction = await Reaction.findOne({ post_id: postId });
  if (!reaction) {
    reaction = new Reaction({ post_id: postId });
    return await reaction.save();
  }

  const inc = body.type === "increment" ? 1 : -1;

  switch (body.reaction) {
    case "heart":
      reaction.heart_count += inc;
      break;
    case "skull":
      reaction.skull_count += inc;
      break;
    case "thumbup":
      reaction.thumbup_count += inc;
      break;
  }

  return await reaction.save();
});
