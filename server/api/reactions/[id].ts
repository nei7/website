import { object, mixed, ValidationError } from "yup";
import { serverSupabaseClient } from "#supabase/server";
import { Database } from "../../../types/database";

const reactionSchema = object({
  reaction: mixed<"thumbup" | "skull" | "heart">()
    .oneOf(["thumbup", "skull", "heart"] as const)
    .defined(),
  type: mixed<"decrement" | "increment">()
    .oneOf(["decrement", "increment"] as const)
    .defined(),
});

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);

  const method = getMethod(event);

  const postId = event.context.params?.id;
  if (!postId)
    return {
      error: "invalid post id provided",
    };
  try {
    if (method === "POST") {
      const body = await readBody(event);

      const { reaction, type } = await reactionSchema.validate(body);

      const { data } = await supabase
        .from("reactions")
        .select("*")
        .eq("post_id", postId)
        .limit(1)
        .single();

      if (!data) {
        return supabase
          .from("reactions")
          .insert({ post_id: postId, [`${reaction}_count`]: 1 });
      }

      const reactionCount = data[`${reaction}_count`];

      return supabase
        .from("reactions")
        .update({
          [`${reaction}_count`]:
            type === "increment" ? reactionCount + 1 : reactionCount - 1,
        })
        .eq("post_id", postId);
    }

    if (method === "GET")
      return supabase.rpc("get_reactions", { postid: postId });
  } catch (err) {
    if (err instanceof ValidationError) {
      setResponseStatus(event, 400);

      return {
        error: err.message,
      };
    }

    setResponseStatus(event, 500);
    return { error: (err as any)?.message || err };
  }
});
