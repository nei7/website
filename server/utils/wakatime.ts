import { URLSearchParams } from "url";

export const getToken = () => {
  return $fetch<{
    access_token: string;
    refresh_token: string;
  }>("https://wakatime.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: process.env.WAKATIME_CLIENT_ID as string,
      client_secret: process.env.WAKATIME_CLIENT_SECRET as string,
      refresh_token: process.env.WAKATIME_REFRESH_TOKEN as string,
      redirect_uri: "https://localhost:3000/wakatime",
      grant_type: "refresh_token"
    }).toString()
  });
};
