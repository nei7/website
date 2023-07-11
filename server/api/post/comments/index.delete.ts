import { serverSupabaseClient } from "#supabase/server";
import { Database } from "../../../types/supabase";

export default defineEventHandler((event) => {
  const supabase = serverSupabaseClient<Database>(event);

  const query = getQuery(event);

  return supabase.from("comments").delete().eq("id", query.postId);
});
