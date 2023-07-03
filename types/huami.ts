export interface SmartwatchData {
  sleep: {
    hours: number;
    minutes: number;
    deepSleep: number;
    lightSleep: number;
    total: number;
  };
  steps: {
    total: number;
    calories: number;
    distance: number;
  };
  date: string;
  uuid: string;
}
