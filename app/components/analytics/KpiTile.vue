<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  hint?: string;
}>();
</script>

<template>
  <div>
    <p class="font-mono text-[0.625rem] tracking-wider text-muted-foreground uppercase">{{ label }}</p>
    <!-- Proportional figures on purpose: tabular digits look loose at this size. -->
    <p class="mt-1 text-3xl font-semibold">{{ value }}</p>
    <p v-if="hint" class="mt-0.5 font-mono text-xs text-muted-foreground">{{ hint }}</p>
  </div>
</template>
