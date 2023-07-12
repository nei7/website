<script setup lang="ts">
import { Comment as CommentType, useCommentStore } from "~/stores/comments";
import Comment from "./Comment.vue";

defineProps<{ comments: CommentType[] | undefined }>();

const { getChildComments } = useCommentStore();

const user = useSupabaseUser();
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
    <template v-for="comment in comments" :key="comment.id" v-if="comments">
      <Comment
        class="mt-10"
        :id="comment.id"
        :username="comment.username"
        :avatar_url="comment.avatar_url"
        :data="comment.data"
        :created_at="comment.created_at"
        :profile_url="comment.profile_url"
        :loved="comment.loved"
        :replyOf="comment.reply_of"
        :deletable="user?.id === comment.user_id"
      ></Comment>

      <CommentsList
        :comments="getChildComments(comment.id)"
        class="ml-10"
      ></CommentsList>
    </template>
  </TransitionGroup>
</template>
