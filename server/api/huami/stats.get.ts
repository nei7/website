import { Activity } from "../../utils/huami";
import { yyyymmdd } from "../../utils";

export interface Response<T = any> {
  code: number;
  message: string;
  data: T;
}

async function getActivities() {
  const date = new Date();
  const to_date = yyyymmdd(date);

  date.setDate(date.getDate() - 7);
  const from_date = yyyymmdd(date);

  const { data } = await $fetch<Response<Activity[]>>(
    `https://api-mifit.huami.com/v1/data/band_data.json?query_type=summary&device_type=android&userid=7064241805&from_date=${from_date}&to_date=${to_date}`,
    {
      headers: {
        apptoken: process.env.HUAMI_TOKEN as string,
        appname: "com.xiaomi.hm.health",
        appPlatform: "web",
      },
    }
  );

  return parseActivities(data);
}

export default cachedEventHandler(getActivities);
