import { Summary } from "../../../../types/wakatime";
import { getToken } from "../../../utils/wakatime";
import { yyyymmdd } from "../../../../composables/utils";

export default cachedEventHandler(async () => {
  const { access_token } = await getToken();
  const summaries = await getSummaries(access_token);

  return summaries.data.map(
    ({
      categories,
      grand_total,
      editors,
      languages,
      machines,
      operating_systems,
      range
    }) => ({
      categories,
      grand_total,
      editors,
      languages,
      machines,
      operating_systems,
      range
    })
  );
});

const getSummaries = (token: string) => {
  const date = new Date();
  const endDate = yyyymmdd(date);

  date.setDate(date.getDate() - 7);
  const startDate = yyyymmdd(date);

  return $fetch<{ data: Summary[] }>(
    `https://wakatime.com/api/v1/users/current/summaries?start=${startDate}&end=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
