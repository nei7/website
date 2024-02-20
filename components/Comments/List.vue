<script setup lang="ts">
import Comment from "./Comment.vue";
import { useUser } from "~/composables/useUser";

import { type Comment as CommentType, useCommentStore } from "~/stores/comments";

defineProps<{ comments: CommentType[] | undefined }>();

const { getChildComments } = useCommentStore();

const { data: user } = useUser();
</script>

<template>
  <TransitionGroup
    enter-active-class="transition-all duration-500"
    enter-from-class="opacity-0 translate-y-3"
    leave-active-class="transition-all duration-500"
    leave-from-class="opacity-100 translate-y-3"
    leave-to-class="opacity-0 translate-y-0"
    tag="div"
  >
    <div v-for="comment in comments" :key="comment.id">
      <Comment
        :id="comment.id"
        class="mt-10"
        :username="comment.username"
        :avatar_url="comment.avatar_url"
        :data="comment.data"
        :created_at="comment.created_at"
        :profile_url="comment.profile_url"
        :loved="comment.loved"
        :reply-of="comment.reply_of"
        :deletable="user?.id === comment.user_id"
      ></Comment>

      <CommentsList :comments="getChildComments(comment.id)" class="ml-10"></CommentsList>
    </div>
  </TransitionGroup>
</template>
