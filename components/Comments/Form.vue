<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useCommentStore } from "~/stores/comments";
import { useAppStore } from "~/stores";

const commentFormRef = ref<HTMLDivElement>();
const user = useSupabaseUser();
const isCommenting = ref(false);
const commentText = ref("");
const store = useCommentStore();

const { setAuthDialog } = useAppStore();

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

const onClick = async () => {
  if (!user.value) return;
  await store.handleAddComment(commentText.value, user.value?.id);
  commentText.value = "";
};

const handleDismissReply = () => {
  store.$patch({
    replyComment: null
  });
};

const onFocus = (e: FocusEvent) => {
  if (user.value) isCommenting.value = true;
  else (e.target as HTMLInputElement).blur();
};
</script>

<template>
  <div ref="commentFormRef">
    <Textarea
      v-model="commentText"
      placeholder="Leave a comment..."
      @focus="onFocus"
      @click.prevent="setAuthDialog(!user)"
    ></Textarea>

    <div class="flex gap-x-5 items-center mt-5">
      <Button
        v-if="isCommenting"
        size="sm"
        :disabled="!commentText"
        @click="onClick"
      >
        Submit
      </Button>

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
