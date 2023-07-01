import { Summary } from "../../../types/wakatime";

export default defineEventHandler(async () => {
  const summaries = await getSummaries();

  return summaries.data.map(
    ({
      categories,
      grand_total,
      editors,
      languages,
      machines,
      operating_systems,
      range,
    }) => ({
      categories,
      grand_total,
      editors,
      languages,
      machines,
      operating_systems,
      range,
    })
  );
});

const getSummaries = async () => {
  const date = new Date();
  const endDate = yyyymmdd(date);

  date.setDate(date.getDate() - 7);
  const startDate = yyyymmdd(date);

  return $fetch<{ data: Summary[] }>(
    `https://wakatime.com/api/v1/users/current/summaries?start=${startDate}&end=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.WAKATIME_TOKEN}`,
      },
    }
  );
};

const yyyymmdd = (date: Date) => date.toISOString().substring(0, 10);
