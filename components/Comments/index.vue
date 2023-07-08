<script setup lang="ts">
import { useCommentStore } from "~/stores/comments";
import { storeToRefs } from "pinia";
import Comment from "./Comment.vue";

const store = useCommentStore();

const { commentTreeList } = storeToRefs(store);
</script>

<template>
  <TransitionGroup
    enter-active-class="transition-all duration-500"
    enter-from-class="opacity-0 translate-y-3"
    leave-active-class="transition-all duration-500"
    leave-from-class="opacity-0 translate-y-3"
    tag="div"
  >
    <div v-for="{ comment, children } in commentTreeList" :key="comment.id">
      <Comment
        class="mt-10"
        :id="comment.id"
        :username="comment.username"
        :avatar_url="comment.avatar_url"
        :data="comment.data"
        :created_at="comment.created_at"
        :profile_url="comment.profile_url"
        :loved="comment.loved"
      ></Comment>

      <Comment
        v-for="childComment in children"
        class="mt-10 ml-10"
        :id="childComment.id"
        :username="childComment.username"
        :avatar_url="childComment.avatar_url"
        :data="childComment.data"
        :created_at="childComment.created_at"
        :profile_url="childComment.profile_url"
        :loved="childComment.loved"
      ></Comment>
    </div>
  </TransitionGroup>
</template>
