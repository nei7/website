<script setup lang="ts">
import { useCommentStore } from "~/stores/comments";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useCommentReply } from "~/composables/comment";

const supabase = useSupabaseClient();
const user = await supabase.auth.getUser();

const commentFormRef = ref<HTMLDivElement>();

const isCommenting = ref(false);
const commentText = ref("");

const { handleAddComment } = useCommentStore();

const { commentId, commentUsername } = useCommentReply();
watch(commentId, (data) => {
  if (data !== null)
    commentFormRef.value?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
});

const handleSignIn = () => {
  if (!user) {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }
};

const onClick = async () => {
  await handleAddComment(commentText.value, commentId.value);
  commentText.value = "";
};

const handleDismissReply = () => {
  commentId.value = null;
  commentUsername.value = null;
};
</script>

<template>
  <div ref="commentFormRef">
    <Textarea
      v-model="commentText"
      placeholder="Leave a comment..."
      @focus="isCommenting = true"
      @click="handleSignIn"
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
        v-if="commentId !== null"
        class="bg-gray-100 px-4 py-2 rounded-xl flex items-center text-xs font-medium text-slate-600"
      >
        Replying to: @{{ commentUsername }}

        <span class="ml-2 cursor-pointer" @click="handleDismissReply">
          <XMarkIcon class="w-4 h-4"></XMarkIcon>
        </span>
      </div>
    </div>
  </div>
</template>
