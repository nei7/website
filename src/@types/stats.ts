export interface Activity {
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

export interface IWorkout {
  id: string;
  calories: number;
  endTime: number;
  time: number;
  heartRate: number;
  type: number;
  maxHeartRate: number;
  minHeartRate: number;
}
