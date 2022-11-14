<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { onBeforeMount } from "vue";
import { useStore } from "../stores";

const store = useStore();
onBeforeMount(async () => await store.fetch());

const calculateTime = (minutes: number) =>
  `${Math.floor(minutes / 60)}h ${Math.round(minutes % 60)}m`;

const avgSleepTime = computed(() =>
  calculateTime(
    store.sleepActivities.reduce((a, b) => a + b.sleep.total, 0) /
      store.sleepActivities.length
  )
);

const totalWalkingDistance = computed(() =>
  store.$state.activities.reduce((a, b) => a + b.steps.distance, 0)
);

const totalWorkoutsTime = computed(() =>
  Math.floor(store.latestWorkouts.reduce((a, b) => b.time + a, 0) / 60)
);
</script>

<template>
  <main class="w-full max-w-2xl mt-10 mx-auto px-4 sm:p-0">
    <section class="text-justify sm:text-left mb-10">
      <h1 class="mb-5 sm:mb-2">Statistics</h1>

      <p>Various statistics obtained from my xiaomi smartwatch</p>
    </section>

    <section class="pb-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 mb-10 gap-5">
        <StatCard title="Avg sleep time">
          {{ avgSleepTime }}
        </StatCard>

        <StatCard title="Total walking distance">
          {{ totalWalkingDistance / 1000 }} km
        </StatCard>

        <StatCard title="Workouts done">
          {{ store.latestWorkouts.length }}
        </StatCard>

        <StatCard title="Total workouts time">
          {{ totalWorkoutsTime }}
          m
        </StatCard>
      </div>

      <div v-if="store.activities.length">
        <SleepChart :activities="store.sleepActivities" class="mb-20" />
        <StepsChart :activities="store.activities" />
      </div>
    </section>

    <!-- <section class="mt-10 pb-10">
      <h3 class="mb-10">Recent Workouts</h3>

      <WorkoutsList :workouts="store.latestWorkouts" />
    </section> -->
  </main>
</template>
