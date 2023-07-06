<script setup lang="ts">
import { HeartIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  avatar_url: string;
  data: string;
  username: string;
  created_at: string;
  profile_url: string;
  loved: number;
}>();

const created = computed(() => yyyymmdd(new Date(props.created_at)));
</script>

<template>
  <div class="flex gap-x-5 w-full mt-16">
    <a :href="profile_url">
      <img :src="avatar_url" alt="" class="rounded-full w-8 h-8" />
    </a>

    <div class="w-full">
      <div class="border p-4 rounded-md px-4">
        <span class="text-slate-600">
          <b class="text-lg text-slate-900">{{ username }}</b>
          / {{ created }}
        </span>

        <p class="text-slate-600 mt-2">{{ data }}</p>
      </div>
      <div class="py-3 px-1 flex items-center text-slate-600 gap-x-2">
        <HeartIcon class="w-5 h-5"></HeartIcon>
        {{ loved }}
      </div>
    </div>
  </div>
</template>
