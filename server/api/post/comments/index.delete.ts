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
    .eq("id", query.postId)
    .limit(1)
    .single();

  if (!comment.data) {
    return makeResponse(
      event,
      {
        error: "Comment not found",
      },
      { code: 404 }
    );
  }

  if (comment.data.user_id !== user.id)
    return makeResponse(
      event,
      {
        error: "Forbidden",
      },
      { code: 403 }
    );

  return supabase.from("comments").delete().eq("id", query.postId);
});
