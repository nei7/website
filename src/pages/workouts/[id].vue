<script setup lang="ts">
import { getWorkouts } from "../../composables/api";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../stores";
import { onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";
import { workoutType } from "../../constants";
import { useHead } from "@vueuse/head";

useHead({
  title: "Workout",
});

const { params } = useRoute();
const { $patch, $state } = useStore();

const workout = computed(() => $state.workouts.find((w) => w.id === params.id));

const { push } = useRouter();

onBeforeMount(async () => {
  if ($state.workouts.length === 0) {
    const workouts = await getWorkouts();
    $patch({
      workouts,
    });

    if (!workouts) push("/404");
  }
});
</script>

<template>
  <main class="w-full max-w-2xl mt-10 mx-auto px-4 sm:p-0" v-if="workout">
    <section class="text-justify sm:text-left mb-10">
      <p>
        {{
          // @ts-ignore
          workoutType[workout.type]
        }}
      </p>
    </section>

    <section>
      <div class="grid grid-cols-2 mb-10 gap-5">
        <StatCard title="Avg heart rate">
          {{ workout.heartRate }} bpm
        </StatCard>
        <StatCard title="Max heart rate">
          {{ workout.maxHeartRate }} bpm
        </StatCard>
        <StatCard title="Min heart rate">
          {{ workout.minHeartRate }} bpm
        </StatCard>
      </div>
    </section>
  </main>
</template>
