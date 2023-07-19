<script setup lang="ts">
import Form from "./Form.vue";
import List from "./List.vue";
import { useCommentStore } from "~/stores/comments";
import { storeToRefs } from "pinia";

const store = useCommentStore();

const { rootComments } = storeToRefs(store);
</script>

<template>
  <Form class="mb-20"></Form>

  <ClientOnly fallback="Loading comments...">
    <List :comments="rootComments"></List
  ></ClientOnly>
</template>
