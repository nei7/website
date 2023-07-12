<script setup lang="ts">
import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { useCommentReply } from "~/composables/comment";
import { useCommentStore } from "~/stores/comments";

const props = defineProps<{
  id: number;
  avatar_url: string;
  data: string;
  username: string;
  created_at: string;
  profile_url: string;
  loved: number;
  deletable: boolean;
  replyOf: null | number;
}>();

const loved = ref(props.loved);

const created = computed(() => yyyymmdd(new Date(props.created_at)));

const { commentUsername, commentId } = useCommentReply();
const { handleDeleteComment } = useCommentStore();

const onReply = () => {
  commentId.value = props.id;
  commentUsername.value = props.username;
};

const handleReaction = async () => {
  await $fetch(`/api/post/comments/reaction?commentId=${props.id}`, {
    method: "POST",
  });
  loved.value++;
};
</script>

<template>
  <div class="flex gap-x-5 w-full">
    <a :href="profile_url" class="shrink-0">
      <img :src="avatar_url" alt="" class="rounded-full w-8 h-8" />
    </a>

    <div class="w-full">
      <div class="border-[#eceef0] border p-4 rounded-lg px-4">
        <span class="text-slate-500 text-sm">
          <b class="text-slate-900 font-medium">{{ username }}</b>
          / {{ created }}
        </span>

        <p class="text-slate-600 mt-2 break-all">{{ data }}</p>
      </div>
      <div class="flex items-center text-slate-700 text-sm gap-x-4 py-2">
        <div
          class="flex items-center cursor-pointer transition ease-in-out active:scale-90 hover:bg-gray-100 py-2 px-2 rounded-lg"
          @click="handleReaction"
        >
          <HeartIcon class="w-4 h-4 mr-2" /> {{ loved }} likes
        </div>
        <div
          class="flex items-center cursor-pointer transition ease-in-out active:scale-90 hover:bg-gray-100 py-2 px-2 rounded-lg"
          @click="onReply"
        >
          <ChatBubbleLeftEllipsisIcon class="w-4 h-4 mr-2" />
          Reply
        </div>

        <div
          v-if="deletable"
          class="flex items-center cursor-pointer transition ease-in-out active:scale-90 hover:bg-gray-100 py-2 px-2 rounded-lg"
          @click="handleDeleteComment(id, replyOf)"
        >
          <TrashIcon class="w-4 h-4 mr-2" />
          Delete
        </div>
      </div>
    </div>
  </div>
</template>
