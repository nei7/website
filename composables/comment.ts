export type CommentReplyData = {
  commentId: Ref<number | null>;
  commentUsername: Ref<string | null>;
};

export function useCommentReply() {
  return inject("commentReply") as CommentReplyData;
}
