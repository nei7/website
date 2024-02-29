<script setup lang="ts">
import { useToast } from "#imports";

const { notifications } = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="fixed flex items-center flex-col justify-end z-[100] bottom-0 w-full">
      <TransitionGroup
        v-if="notifications.length"
        class="px-4 sm:px-6 py-6 space-y-3 overflow-y-auto"
        tag="div"
        enter-active-class="transform ease-out duration-500 transition"
        enter-from-class="translate-y-5 opacity-0 sm:translate-y-0 sm:translate-x-5"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition transform ease-in duration-1000"
        leave-from-class="translate-y-0 opacity-0 sm:translate-x-0"
        leave-to-class="opacity-0 -translate-y-5 sm:-translate-x-5"
      >
        <div v-for="notification in notifications" :key="notification.id">
          <Notification v-bind:="notification"></Notification>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
