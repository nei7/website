<script setup lang="ts">
import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/24/outline";
import { useCommentReply } from "~/composables/comment";

const props = defineProps<{
  id: number;
  avatar_url: string;
  data: string;
  username: string;
  created_at: string;
  profile_url: string;
  loved: number;
}>();

const loved = ref(props.loved);

const created = computed(() => yyyymmdd(new Date(props.created_at)));

const { commentUsername, commentId } = useCommentReply();

const onReply = () => {
  commentId.value = props.id;
  commentUsername.value = props.username;
};

const handleReaction = async () => {
  await $fetch("/api/post/comments/reaction", {
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
      <div class="border-[#eceef0] border p-4 rounded-md px-4">
        <span class="text-slate-500">
          <b class="text-slate-900">{{ username }}</b>
          / <span class="text-sm"> {{ created }}</span>
        </span>

        <p class="text-slate-600 mt-2 break-all">{{ data }}</p>
      </div>
      <div class="py-3 px-1 flex items-center text-slate-700 text-sm gap-x-4">
        <div
          class="flex items-center cursor-pointer transition-colors"
          @click="handleReaction"
        >
          <HeartIcon class="w-5 h-5 mr-2" /> {{ loved }} likes
        </div>
        <div
          class="flex items-center cursor-pointer transition-colors"
          @click="onReply"
        >
          <ChatBubbleLeftEllipsisIcon class="w-5 h-5 mr-2" />
          reply
        </div>
      </div>
    </div>
  </div>
</template>
