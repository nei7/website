<script setup lang="ts">
import { useCommentStore } from "~/stores/comments";
import { storeToRefs } from "pinia";

const store = useCommentStore();

const { commentTreeList } = storeToRefs(store);
</script>

<template>
  <div>
    <div v-for="{ comment, children } in commentTreeList">
      <PostComment
        class="mt-10"
        :id="comment.id"
        :username="comment.username"
        :avatar_url="comment.avatar_url"
        :data="comment.data"
        :created_at="comment.created_at"
        :profile_url="comment.profile_url"
        :loved="comment.loved"
      ></PostComment>

      <PostComment
        v-for="childComment in children"
        class="mt-10 ml-10"
        :id="childComment.id"
        :username="childComment.username"
        :avatar_url="childComment.avatar_url"
        :data="childComment.data"
        :created_at="childComment.created_at"
        :profile_url="childComment.profile_url"
        :loved="childComment.loved"
      ></PostComment>
    </div>
  </div>
</template>
