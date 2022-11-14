<script setup lang="ts">
import { FireIcon } from "@heroicons/vue/24/outline";
import type { IWorkout } from "@/@types/stats";
import { workoutType } from "../constants";
import { computed } from "@vue/reactivity";

const { workouts } = defineProps<{
  workouts: IWorkout[];
}>();

const workoutsAsMap = () => {
  const map = new Map<string, IWorkout[]>();

  for (const w of workouts) {
    const d = formatDate(w.endTime);
    const value = map.get(d);
    if (value) {
      map.set(d, [...value, w]);
    } else map.set(d, [w]);
  }

  return map;
};

const formatDate = (time: number) => {
  const date = new Date(time * 1000);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

const formatWorkoutDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration / 60) % 60);
  const seconds = duration % 60;

  return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${(
    "0" + seconds
  ).slice(-2)}`;
};
</script>

<template>
  <ul class="mb-10" v-if="workouts.length > 0">
    <li
      v-for="[date, workouts] in workoutsAsMap()"
      :key="date"
      class="my-3 border-b border-gray-800 pb-3 flex flex-row"
    >
      <div class="grow">
        <div class="text-white text-sm font-sans mb-5">
          {{ date }}
        </div>
        <div class="mb-2" v-for="workout in workouts" :key="workout.id">
          <span class="text-white font-sans font-medium">
            {{
              // @ts-ignore
              workoutType[workout.type] || "Workout"
            }}
          </span>

          <div
            class="flex items-center font-sans text-sm font-medium text-gray-400 mt-2"
          >
            <span class="mr-10">
              {{ formatWorkoutDuration(workout.time) }}
            </span>

            <FireIcon class="w-5 h-5 text-gray-300 mr-1" />

            {{ workout.calories }}
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
