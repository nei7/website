<script setup lang="ts">
import { HeartIcon, ChatBubbleLeftEllipsisIcon, TrashIcon } from "@heroicons/vue/24/outline";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useCommentStore } from "~/stores/comments";

dayjs.extend(relativeTime);

const props = defineProps<{
  _id: string;
  avatar_url: string;
  data: string;
  username: string;
  created_at: number;
  profile_url: string;
  loved: number;
  deletable: boolean;
  replyOf: null | string;
}>();

const loved = ref(props.loved);

const created = computed(() => dayjs(new Date(props.created_at)).fromNow());

const { handleDeleteComment, $patch } = useCommentStore();

const onReply = () => {
  $patch({
    replyComment: props
  });
};

const handleReaction = async () => {
  await $fetch(`/api/post/comments/reaction?commentId=${props._id}`, {
    method: "POST"
  });
  loved.value++;
};

const loading = ref(false);

const deleteComment = async () => {
  loading.value = true;
  await handleDeleteComment(props._id, props.replyOf);
  loading.value = false;
};
</script>

<template>
  <div class="flex gap-x-2 w-full">
    <a :href="profile_url" class="shrink-0">
      <img :src="avatar_url" alt="" class="rounded-full w-6 h-6 sm:w-8 sm:h-8" />
    </a>

    <div class="w-full">
      <div class="rounded-2xl px-4">
        <span class="text-slate-500 text-sm">
          <b class="text-slate-900 font-medium">{{ username }}</b>
          / {{ created }}
        </span>

        <p class="text-slate-600 mt-2 break-all">{{ data }}</p>
      </div>
      <div class="flex items-center text-slate-700 text-sm gap-x-4 py-2 px-2">
        <div
          class="text-xs flex items-center cursor-pointer transition ease-in-out active:scale-90 hover:bg-gray-100 py-2 px-2 rounded-lg"
          @click="handleReaction"
        >
          <HeartIcon class="w-4 h-4 mr-2" /> {{ loved }}
        </div>
        <div
          class="text-xs flex items-center cursor-pointer transition ease-in-out active:scale-90 hover:bg-gray-100 py-2 px-2 rounded-lg"
          @click="onReply"
        >
          <ChatBubbleLeftEllipsisIcon class="w-4 h-4 mr-2" />
          Reply
        </div>

        <div
          v-if="deletable"
          class="text-xs flex items-center cursor-pointer transition ease-in-out active:scale-90 hover:bg-gray-100 py-2 px-2 rounded-lg"
          @click="deleteComment"
        >
          <TrashIcon class="w-4 h-4 mr-2" />
          Delete
        </div>
      </div>

      <svg
        v-if="loading"
        class="mx-auto w-7 h-7 text-gray-300 animate-spin"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
      >
        <path
          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
          stroke="currentColor"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
          stroke="currentColor"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-gray-900"
        ></path>
      </svg>
    </div>
  </div>
</template>
