<script setup lang="ts">
import { type TableBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const { table } = defineProps<{ table: TableBlockObjectResponse }>();

const { data: blocks } = useCachedFetch<any>(`/api/notion/blocks/${table.id}`);
</script>

<template>
  <table>
    <tbody>
      <tr v-for="(row, rowIndex) in blocks?.results" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row[row.type].cells" :key="cellIndex">
          <NotionRichText :rich-text="cell"></NotionRichText>
        </td>
      </tr>
    </tbody>
  </table>
</template>
