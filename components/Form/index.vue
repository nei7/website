<script setup lang="ts">
defineProps<{
  error?: { message: string; type: any };
}>();

const data = reactive<any>({});

const buttonDisabled = computed(() => {
  for (const value of Object.values(data)) {
    if ((value as string).trim().length === 0) return true;
  }

  return false;
});
</script>

<template>
  <form novalidate @submit="$emit('submit', data)">
    <!-- <Alert :type="error.type" v-if="error">
      <span class="font-medium">{{ error.message }}</span>
    </Alert> -->
    <slot :data="data"></slot>

    <div class="my-10">
      <Button
        :disabled="buttonDisabled"
        size="sm"
        class="w-full rounded-lg"
        type="submit"
      >
        Submit
      </Button>
    </div>
  </form>
</template>
