<script setup lang="ts">
import { provide, ref } from "vue";
import { CommentReplyData } from "~/composables/comment";
import Form from "./Form.vue";
import Comments from "./index.vue";

provide<CommentReplyData>("commentReply", {
  commentUsername: ref(null),
  commentId: ref(null),
});
</script>

<template>
  <Form class="mb-16"></Form>
  <Comments></Comments>
</template>
