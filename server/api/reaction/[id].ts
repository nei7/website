import { object, string, InferType, mixed } from "yup";
import { serverSupabaseClient } from "#supabase/server";
import { Database } from "../../../types/database";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);

  const method = getMethod(event);

  const postId = event.context.params?.id;
  if (!postId)
    return {
      error: "invalid post id provided",
    };

  if (method === "GET")
    return supabase
      .from("reactions")
      .select()
      .eq("post_id", postId)
      .limit(1)
      .single();

  if (method === "POST") {
    const body = await readBody(event);

    const reactionSchema = object({
      postId: string().required(),
      reaction: mixed<"thumbup" | "skull" | "heart">()
        .oneOf(["thumbup", "skull", "heart"] as const)
        .defined(),
    });

    const data = await reactionSchema.validate(body);

    const reactions = await supabase
      .from("reactions")
      .select("*")
      .eq("post_id", postId)
      .limit(1)
      .single();

    const reactionReq = {
      thumbup_count: 0,
      skull_count: 0,
      heart_count: 0,
    };

    if (reactions.data) {
      const { thumbup_count, skull_count, heart_count } = reactions.data;

      reactionReq.thumbup_count = thumbup_count;
      reactionReq.skull_count = skull_count;
      reactionReq.heart_count = heart_count;
    }

    switch (data.reaction) {
      case "skull":
        reactionReq.skull_count++;
        break;
      case "heart":
        reactionReq.heart_count++;
        break;
      case "thumbup":
        reactionReq.thumbup_count++;
        break;
    }

    if (reactions.data) {
      return supabase
        .from("reactions")
        .update(reactionReq)
        .eq("post_id", postId);
    } else {
      return await supabase
        .from("reactions")
        .insert({ post_id: postId, ...reactionReq });
    }
  }
});
