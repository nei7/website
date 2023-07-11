<script setup lang="ts">
import { provide, ref } from "vue";
import { CommentReplyData } from "~/composables/comment";
import Form from "./Form.vue";
import List from "./List.vue";
import { useCommentStore } from "~/stores/comments";
import { storeToRefs } from "pinia";

provide<CommentReplyData>("commentReply", {
  commentUsername: ref(null),
  commentId: ref(null),
});

const store = useCommentStore();

const { rootComments } = storeToRefs(store);
</script>

<template>
  <Form class="mb-16"></Form>

  <ClientOnly fallback="Loading comments...">
    <List :comments="rootComments"></List
  ></ClientOnly>
</template>
