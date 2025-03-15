<script setup lang="ts">
import type { Block } from '~/shared/notion/types';

defineProps<{ blocks: Block[] }>()

</script>

<template>
    <NotionRenderer :blocks="blocks"></NotionRenderer>
</template>
