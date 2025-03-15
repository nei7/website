<script setup lang="ts">
import { type TableBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { isFullBlock } from "@notionhq/client";
import { isType } from '~/shared/notion/utils';
import TextRenderer from "./TextRenderer.vue";

const props = defineProps<{ table: TableBlockObjectResponse }>();

const { data } = useBlocks({ blockId: props.table.id })

const rows = computed(() => {
    const filteredData = data.value.filter(isFullBlock).filter(res => isType(res, 'table_row'))
    return props.table.table.has_row_header ? filteredData.slice(1) : filteredData
})

const headerRow = computed(() => rows.value[0] ? rows.value[0].table_row.cells : [])
</script>

<template>
    <Table>
        <TableHeader v-if="props.table.table.has_row_header">
            <TableRow>
                <TableHead v-for="cell in headerRow">
                    <TextRenderer :text="cell"></TextRenderer>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="row in rows">
                <TableCell v-for="cell in row.table_row.cells">
                    <TextRenderer :text="cell"></TextRenderer>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>

</template>