import { Database } from "../../../types/supabase";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler((event) => {
  const supabase = serverSupabaseClient<Database>(event);

  const query = getQuery(event);

  return supabase.from("comments").select("*").eq("post_id", query.postId);
});
