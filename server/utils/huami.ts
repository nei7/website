import { SmartwatchData } from "../../types/huami";

export interface Activity {
  uid: string;
  data_type: 0;
  date_time: string;
  source: number;
  summary: string;
  uuid: string;
}

export enum ActivityMode {
  SlowWalking = 1,
  FastWalking = 3,
  Running = 4,
  LightActivity = 7
}

export interface Summary {
  v: number;
  slp: {
    // Slept start date
    st: number;

    // Slept end date
    ed: number;

    // Deep sleep
    dp: number;

    // LightSleep
    lt: number;

    wk: number;
    usrSt: number;
    usrEd: number;
    wc: number;
    is: number;
    lb: number;
    to: number;
    dt: number;
    rhr: number;
    ss: number;
  };

  stp: {
    // Total steps
    ttl: number;

    // Total distance (meters)
    dis: number;

    // Calories
    cal: number;

    wk: number;
    rn: number;
    runDist: number;
    runCal: number;

    stage: {
      start: number;
      stop: number;
      mode: ActivityMode;
      dis: number;
      cal: number;
      step: number;
    }[];
  };
  goal: number;
  tz: "3600";
  sn: string;
  byteLength: number;
  sync: number;
}

export function parseActivities(activities: Activity[]): SmartwatchData[] {
  return activities.map((activity) => {
    const { slp, stp } = JSON.parse(atob(activity.summary)) as Summary;

    const totalSleepTime = slp.dp + slp.lt;
    return {
      sleep: {
        hours: Math.floor(totalSleepTime / 60),
        minutes: totalSleepTime / 60,
        deepSleep: slp.dp,
        lightSleep: slp.lt,
        total: totalSleepTime
      },
      steps: {
        total: stp.ttl,
        calories: stp.cal,
        distance: stp.dis
      },
      date: activity.date_time,
      uuid: activity.uuid
    };
  });
}
