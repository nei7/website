<script setup lang="ts">
import { type ChildPageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import AppLink from "~/components/AppLink.vue";

defineProps<{ block: ChildPageBlockObjectResponse }>();
</script>

<template>
    <AppLink :to="`/page/${block.id}/${block.child_page.title}`" class="text-green-500 font-medium">
        {{ block.child_page.title }}
    </AppLink>
</template>