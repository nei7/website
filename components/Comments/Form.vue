<script setup lang="ts">
import { useCommentStore } from "~/stores/comments";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import useAuthDialog from "~/composables/useAuthDialog";

const commentFormRef = ref<HTMLDivElement>();

const isCommenting = ref(false);
const commentText = ref("");

const { handleAddComment, $state, $patch } = useCommentStore();

watch(
  () => $state.replyComment,
  (data) => {
    if (data !== null)
      commentFormRef.value?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
  }
);

const user = useSupabaseUser();

const onClick = async () => {
  if (!user.value) return;
  await handleAddComment(commentText.value, user.value?.id);
  commentText.value = "";
};

const handleDismissReply = () => {
  $patch({
    replyComment: null,
  });
};

const { setIsOpen } = useAuthDialog();

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
      @click.prevent="setIsOpen(!user)"
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
        v-if="$state.replyComment !== null"
        class="bg-gray-100 px-4 py-2 rounded-lg flex items-center text-xs font-medium text-slate-800"
      >
        Replying to: @{{ $state.replyComment.username }}

        <span class="ml-2 cursor-pointer" @click="handleDismissReply">
          <XMarkIcon class="w-4 h-4"></XMarkIcon>
        </span>
      </div>
    </div>
  </div>
</template>
