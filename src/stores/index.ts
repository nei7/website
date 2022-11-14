import type { IWorkout, Activity } from "../@types/stats";
import { getStats, getWorkouts } from "../composables/api";

import { defineStore } from "pinia";

interface IState {
  activities: Activity[];
  workouts: IWorkout[];
  fetched: boolean;
}

export const useStore = defineStore("main", {
  state: (): IState => {
    return {
      workouts: [],
      activities: [],
      fetched: false,
    };
  },
  actions: {
    async fetch() {
      if (this.fetched) return;

      this.activities = await getStats();
      this.workouts = await getWorkouts();

      this.fetched = true;
    },
  },
  getters: {
    latestWorkouts: (state) => {
      const now = Date.now() / 1000;
      const d = now - 60 * 60 * 24 * 11;
      for (let i = 0; i < state.workouts.length; i++) {
        if (state.workouts[i].endTime < d) {
          return state.workouts.slice(0, i);
        }
      }
      return [];
    },
    sleepActivities: (state) =>
      state.activities.filter((activity) => activity.sleep.hours > 0),
  },
});
