<script setup lang="ts">
import { Icon } from "@iconify/vue";

const { status, data: song } = useFetch<{
  name: string | null;
  isPlaying: boolean;
  songUrl: string | null;
  artist: string[] | null;
}>("/api/spotify", { lazy: true });
</script>

<template>
  <div class="flex items-center gap-3">
    <Icon icon="logos:spotify-icon" class="w-5 h-5" />

    <div class="text-xs sm:text-sm opacity-75 min-w-0 flex-1">
      <p class="truncate">
        <template v-if="status === 'error'"> Couldn't get the song </template>
        <template v-else-if="status === 'pending'"> Loading... </template>

        <template v-else-if="song && song.isPlaying">
          <a
            :href="song.songUrl || ''"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ song.name }} -
            {{ song.artist?.join(", ") }}
          </a>
        </template>
        <template v-else>Not playing</template>
      </p>
    </div>
  </div>
</template>
