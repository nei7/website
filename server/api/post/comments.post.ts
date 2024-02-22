import { IComment, Comment } from "~/server/models/comment.model";
import { User } from "~/server/models/user.model";

type Body = Omit<IComment, "user_id" | "username">;

export default defineWrappedResponseHandler(async (event) => {
  if (!event.context.userId)
    return createError({
      message: "Unauthorized",
      status: 401
    });

  const user = await User.findById(event.context.userId);
  if (!user)
    return createError({
      message: "Unauthorized",
      status: 401
    });

  const body = await readBody<Body>(event);

  const comment = new Comment({
    ...body,
    user_id: user._id,
    username: user.username,
    avatar_url: user.avatarUrl,
    profile_url: user?.github.html_url
  });

  return comment.save();
});
