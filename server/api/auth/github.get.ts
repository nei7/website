import { MongooseError } from "mongoose";
import { User } from "~/server/models/user.model";
import { signToken } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const data = await $fetch<{ access_token: string }>(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.GITHUB_OAUTH_CLIENT_SECRET}&code=${query.code}&scope=read:user,user:email`,
      {
        headers: {
          Accept: "application/json"
        },
        method: "POST"
      }
    );

    const { access_token } = data;

    const githubUser = await $fetch<{ avatar_url: string; login: string; id: string; html_url: string; name: string; email: string }>(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    const email = await $fetch<{ email: string; primary: boolean }[]>("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then((emails) => emails.find((e) => e.primary)?.email);

    if (!email) return createError({ status: 400, message: "No email assigned to account" });

    const user =
      (await User.findOneAndUpdate({ email }, { github: githubUser })) ||
      (await new User({
        email,
        username: githubUser.login,
        avatarUrl: githubUser.avatar_url,
        password: null,
        github: githubUser
      }).save());

    user.password = undefined;

    const token = signToken(user.id);

    setCookie(event, "token", token, { secure: true });

    return sendRedirect(event, "/");
  } catch (err) {
    console.log(err);

    if (err instanceof MongooseError) {
      return createError({ message: err.message });
    }

    return createError({
      message: "Internal server error",
      status: 500
    });
  }
});
