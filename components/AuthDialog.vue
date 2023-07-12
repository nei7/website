<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import useAuthDialog from "~/composables/useAuthDialog";

const { setIsOpen, isOpen } = useAuthDialog();
</script>
<template>
  <Dialog @close="setIsOpen" :open="isOpen" class="px-6 pb-8">
    <div class="flex items-center justify-between">
      <DialogTitle>Log in </DialogTitle>
      <button
        @click="setIsOpen(false)"
        class="p-1 hover:bg-gray-100 rounded-lg"
      >
        <XMarkIcon class="w-6 h-6"></XMarkIcon>
      </button>
    </div>
    <DialogDescription class="mb-12">
      You must be logged in to add comments and reactions to a post
    </DialogDescription>

    <div class="w-full flex flex-col gap-y-3 sm:px-20 mt-10">
      <Button size="sm" href="/enter">Login</Button>
      <Button
        size="sm"
        transparent
        href="/enter"
        color="bg-transparent text-slate-700"
        >Create account</Button
      >
    </div>
  </Dialog>
</template>
