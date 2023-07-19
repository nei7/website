import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "../../../types/supabase";
import { makeResponse } from "../../../utils/response";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    return makeResponse(
      event,
      {
        error: "User not logged in",
      },
      { code: 401 }
    );
  }

  const query = getQuery(event);
  const comment = await supabase
    .from("comments")
    .select("*")
    .eq("id", query.commentId)
    .limit(1)
    .single();

  if (!comment.data) {
    return createError({
      statusCode: 404,
      message: "Comment not found",
    });
  }

  if (comment.data.user_id !== user.id)
    return createError({
      statusCode: 403,
      message: "Forbidden",
    });

  return supabase.from("comments").delete().eq("id", query.postId);
});
