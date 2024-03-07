import { getToken } from "../../../utils/wakatime";

export default cachedEventHandler(async () => {
  const access_token = await getToken();

  return getStats(access_token);
});

const getStats = (token: string) => {
  return $fetch("https://wakatime.com/api/v1/users/current/stats", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
