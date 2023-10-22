import { Database } from "../../../types/supabase";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);

  const method = getMethod(event);

  const postId = event.context.params?.id;
  if (!postId)
    return {
      error: "invalid post id provided"
    };
  try {
    if (method === "POST") {
      const { reaction, type } = await readBody(event);

      const { data } = await supabase.from("reactions").select("*").eq("post_id", postId).limit(1).single();

      if (!data) {
        return supabase.from("reactions").insert({ post_id: postId, [`${reaction}_count`]: 1 });
      }

      const reactionCount = data[`${reaction}_count`];

      return supabase
        .from("reactions")
        .update({
          [`${reaction}_count`]: type === "increment" ? reactionCount + 1 : reactionCount - 1
        })
        .eq("post_id", postId);
    }

    if (method === "GET") return supabase.rpc("get_reactions", { postid: postId });
  } catch (err) {
    return createError({
      statusCode: 500,
      message: (err as Error).message
    });
  }
});
