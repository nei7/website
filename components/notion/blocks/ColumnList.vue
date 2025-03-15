<script setup lang="ts">
import type { ColumnListBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { isFullBlock } from '@notionhq/client';
import { isType } from '~/shared/notion/utils';
import Column from './Column.vue';

const props = defineProps<{
    block: ColumnListBlockObjectResponse
}>()


const { data } = useBlocks({
    blockId: props.block.id
})

const columns = computed(() => data.value.filter(isFullBlock).filter((res) => isType(res, 'column')))
</script>

<template>
    <div class="flex items-center space-x-4 justify-evenly">
        <div v-for="column in columns" class="w-full">
            <Column :block="column"></Column>
        </div>
    </div>
</template>