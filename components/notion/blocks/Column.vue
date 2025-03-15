<script setup lang="ts">
import type { ColumnBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import NotionRenderer from '../Renderer.vue'

const props = defineProps<{
    block: ColumnBlockObjectResponse
}>()


const { data } = useBlocks({
    blockId: props.block.id
})
</script>


<template>
    <div>
        <NotionRenderer v-if="data" :blocks="data"></NotionRenderer>
    </div>
</template>