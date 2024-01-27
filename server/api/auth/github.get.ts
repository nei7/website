import qs from "node:querystring";

export default defineWrappedResponseHandler(async (event) => {
  const query = getQuery(event);

  const data = await $fetch<Blob>(
    `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.GITHUB_OAUTH_CLIENT_SECRET}&code=${query.code}`,
    {
      method: "POST",
      responseType: "blob"
    }
  );

  const { access_token } = qs.parse(await data.text());

  const user = await $fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  console.log(user);
  return user;
});
