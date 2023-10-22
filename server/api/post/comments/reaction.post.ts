import { Database } from "../../../types/supabase";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);

  const query = getQuery(event);

  const { data: comment } = await supabase.from("comments").select("*").eq("id", query.commentId).limit(1).single();

  if (comment) {
    return supabase
      .from("comments")
      .update({ loved: comment.loved + 1 })
      .match({ id: comment.id });
  }

  return comment;
});
