<script setup lang="ts">
import Comment from "./index.vue";
import useUser from "~/composables/useUser";

import { type Comment as CommentType, useCommentStore } from "~/stores/comments";

defineProps<{ comments: CommentType[] | undefined }>();

const { getChildComments } = useCommentStore();

const { data: user } = useUser();
</script>

<template>
  <TransitionGroup
    v-if="comments && comments?.length > 0"
    enter-active-class="transition-all duration-1000"
    enter-from-class="opacity-0 -translate-y-3"
    enter-to-class="opacity-100 translate-y-0"
    tag="div"
  >
    <div v-for="comment in comments" :key="comment._id" :class="{ 'border-b': !comment.reply_of }" class="pb-4">
      <Comment
        :_id="comment._id"
        class="mt-10"
        :username="comment.username"
        :avatar_url="comment.avatar_url"
        :data="comment.data"
        :created_at="comment.created_at"
        :profile_url="comment.profile_url"
        :loved="comment.loved"
        :reply-of="comment.reply_of"
        :deletable="user?.userId === comment.user_id"
      ></Comment>

      <CommentList :comments="getChildComments(comment._id)" class="ml-10 border-0"></CommentList>
    </div>
  </TransitionGroup>
</template>
