import { Database } from "../../../types/supabase";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const supabase = serverSupabaseClient<Database>(event);
  const user = await supabase.auth.getUser();

  if (!user.data.user) return;

  const { avatar_url, picture, preferred_username } = user.data.user.user_metadata;

  return supabase
    .from("comments")
    .insert({
      username: preferred_username || user.data.user.email?.split("@")[0],
      data: body.text,
      avatar_url: avatar_url || picture,
      post_id: body.postId,
      profile_url: preferred_username ? `https://github.com/${preferred_username}` : null,
      reply_of: body.replyOf,
      user_id: body.userId
    })
    .select();
});
