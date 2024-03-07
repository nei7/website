import { URLSearchParams } from "url";
import { User } from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
  try {
    const { code } = getQuery(event);

    if (!code)
      return createError({
        message: "code is required",
        status: 400
      });

    const data = await $fetch<{ token_type: string; access_token: string }>("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_OAUTH_CLIENT_ID || "",
        client_secret: process.env.DISCORD_OAUTH_CLIENT_SECRET || "",
        code: code?.toString(),
        grant_type: "authorization_code",
        redirect_uri: "https://fszarek.me/api/auth/discord",
        scope: "identify"
      }).toString()
    });

    const discordUser = await $fetch<{ email: string; avatar: string; username: string; id: string }>("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${data.token_type} ${data.access_token}`
      }
    });

    const user =
      (await User.findOneAndUpdate({ email: discordUser.email }, { discord: discordUser })) ||
      (await new User({
        email: discordUser.email,
        username: discordUser.username,
        avatarUrl: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp`,
        password: null,
        discord: discordUser
      }).save());

    const token = signToken(user.id);

    setCookie(event, "token", token, { secure: true });

    return sendRedirect(event, "/");
  } catch (err) {
    return createError({
      message: "Internal server error",
      status: 500
    });
  }
});
