import { defineStore } from "pinia";

export interface Comment {
  id: number;
  username: string;
  data: string;
  reply_of: null | number;
  avatar_url: string;
  loved: number;
  post_id: string;
  profile_url: string;
  created_at: string;
  user_id: string;
}

type ReplyComment = Omit<Comment, "reply_of"> & { reply_of: number };

export interface CommentTreeNode {
  comment: Comment;
  children: Array<CommentTreeNode>;
}

export const useCommentStore = defineStore("comments", {
  state(): {
    rootComments: Comment[];
    childComments: Map<number, Comment[]>;
    postId: string;
    replyComment: Comment | null;
  } {
    return {
      rootComments: [],
      postId: "",
      childComments: new Map(),
      replyComment: null,
    };
  },
  getters: {
    getChildComments: (state) => {
      return (id: number) => state.childComments.get(id);
    },
  },

  actions: {
    async fetchList(postId: string) {
      this.childComments = new Map();
      this.rootComments = [];

      const { data: comments } = await useCachedFetch<{ data: Comment[] }>(
        `/api/post/comments?postId=${postId}`
      );

      this.rootComments = comments.value.data.filter(
        (comment) => comment.reply_of === null
      );

      this.postId = postId;

      comments.value.data.forEach((comment) => {
        if (comment.reply_of === null) return;

        if (this.childComments.has(comment.reply_of)) {
          this.childComments.get(comment.reply_of)?.push(comment);
        } else {
          this.childComments.set(comment.reply_of, [comment]);
        }
      });
    },

    async handleAddComment(text: string, userId: string) {
      try {
        const { data } = await $fetch<{ data: Comment[] }>(
          "/api/post/comments",
          {
            method: "POST",
            body: {
              text: text,
              postId: this.postId,
              userId,
              replyOf: this.replyComment?.id,
            },
          }
        );

        if (this.replyComment === null) this.rootComments.push(...data);
        else {
          if (this.childComments.has(this.replyComment.id))
            this.childComments.get(this.replyComment.id)?.push(...data);
          else this.childComments.set(this.replyComment.id, data);
        }
      } catch (err) {
      } finally {
      }
    },

    async handleDeleteComment(commentId: number, replyOf: number | null) {
      try {
        await $fetch(`/api/post/comments?id=${commentId}`, {
          method: "DELETE",
        });

        if (replyOf === null) removeCommentById(commentId, this.rootComments);
        else {
          const comments = this.childComments.get(replyOf);
          if (comments) removeCommentById(commentId, comments);
        }
      } catch (err) {
        useToast({ title: "Error", text: (err as any).response._data.message });
      }
    },
  },
});

function removeCommentById(id: number, comments: Comment[]) {
  return comments.splice(
    comments.findIndex((comment) => comment.id === id),
    1
  );
}
