import mitt from "mitt";

type Events = {
  reply: { commentId: number; username: string };
};

const emitter = mitt<Events>();

export const onCommentReply = (commentId: number, username: string) => {
  emitter.emit("reply", { commentId, username });
};

export const useCommentsEvents = () => {
  const commentFormRef = ref<HTMLDivElement>();
  const isReplying = ref(false);
  const replyOf = ref<null | number>(null);
  const replyUsername = ref("");

  emitter.on("reply", ({ commentId, username }) => {
    isReplying.value = true;
    replyOf.value = commentId;
    replyUsername.value = username;
    commentFormRef.value?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  });

  return {
    isReplying,
    replyOf,
    replyUsername,
    commentFormRef,
  };
};
