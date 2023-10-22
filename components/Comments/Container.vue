<script setup lang="ts">
import { storeToRefs } from "pinia";
import Form from "./Form.vue";
import List from "./List.vue";
import { useCommentStore } from "~/stores/comments";

const store = useCommentStore();

const { rootComments } = storeToRefs(store);
</script>

<template>
  <Form class="mb-20"></Form>

  <ClientOnly fallback="Loading comments..."> <List :comments="rootComments"></List></ClientOnly>
</template>
