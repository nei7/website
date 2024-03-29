<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import useUser from "~/composables/useUser";
import { useCommentStore } from "~/stores/comments";

const store = useCommentStore();
const commentFormRef = ref<HTMLDivElement>();

const isCommenting = ref(false);
const text = ref("");

const { data: user } = useUser();

watch(
  () => store.$state.replyComment,
  (data) => {
    if (data !== null)
      commentFormRef.value?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
  }
);

const handleDismissReply = () => {
  store.$patch({
    replyComment: null
  });
};

const onClick = async () => {
  if (!user.value.userId) return;
  await store.handleAddComment(text.value, user.value.userId);
  text.value = "";
};

const onFocus = (e: FocusEvent) => {
  if (user) isCommenting.value = true;
  else (e.target as HTMLInputElement).blur();
};

const openDialog = inject<() => void>("openDialog");
</script>

<template>
  <div ref="commentFormRef">
    <Textarea v-model="text" placeholder="Leave a comment..." @click="openDialog" @focus="onFocus"></Textarea>

    <div class="flex gap-x-5 items-center mt-5">
      <Button v-if="isCommenting" size="sm" :disabled="!text" @click="onClick"> Submit </Button>

      <div
        v-if="store.$state.replyComment !== null"
        class="bg-gray-100 px-4 py-2 rounded-lg flex items-center text-xs font-medium text-slate-800"
      >
        Replying to: @{{ store.$state.replyComment.username }}

        <span class="ml-2 cursor-pointer" @click="handleDismissReply">
          <XMarkIcon class="w-4 h-4"></XMarkIcon>
        </span>
      </div>
    </div>
  </div>
</template>
