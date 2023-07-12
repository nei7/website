import { serverSupabaseClient } from "#supabase/server";
import { Database } from "../../../types/supabase";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const supabase = serverSupabaseClient<Database>(event);
  const user = await supabase.auth.getUser();

  if (!user.data.user) return;

  const { avatar_url, preferred_username } = user.data.user.user_metadata;

  return supabase
    .from("comments")
    .insert({
      username: preferred_username,
      data: body.text,
      avatar_url: avatar_url,
      post_id: body.postId,
      profile_url: `https://github.com/${preferred_username}`,
      reply_of: body.replyOf,
      user_id: body.userId,
    })
    .select();
});
