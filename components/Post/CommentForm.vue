<script setup lang="ts">
import { useCommentStore } from "~/stores/comments";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const supabase = useSupabaseClient();
const user = await supabase.auth.getUser();

const isCommenting = ref(false);
const commentText = ref("");

const { handleAddComment } = useCommentStore();
const { isReplying, replyOf, replyUsername, commentFormRef } =
  useCommentsEvents();

const handleSignIn = () => {
  if (!user) {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }
};

const handleDismissReply = () => {
  isReplying.value = false;
  replyUsername.value = "";
  replyOf.value = null;
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
        @click="
          handleAddComment(commentText, replyOf);
          commentText = '';
        "
      >
        Submit
      </Button>

      <div
        v-if="isReplying"
        class="bg-gray-100 px-4 py-2 rounded-md flex items-center text-sm font-medium text-slate-600"
      >
        Replying to: @{{ replyUsername }}

        <span class="ml-2 cursor-pointer" @click="handleDismissReply"
          ><XMarkIcon class="w-4 h-4"></XMarkIcon
        ></span>
      </div>
    </div>
  </div>
</template>
