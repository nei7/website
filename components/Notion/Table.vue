<script setup lang="ts">
import { TableBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const { table } = defineProps<{ table: TableBlockObjectResponse }>();

const { data: blocks } = useCachedFetch<any>(`/api/notion/blocks/${table.id}`);
</script>

<template>
  <table>
    <tbody>
      <tr v-for="row in blocks?.results">
        <td v-for="cell in row[row.type].cells">
          <NotionRichText :rich-text="cell"></NotionRichText>
        </td>
      </tr>
    </tbody>
  </table>
</template>
