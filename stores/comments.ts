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
}

type ReplyComment = Omit<Comment, "reply_of"> & { reply_of: number };

export interface CommentTreeNode {
  comment: Comment;
  children: Array<CommentTreeNode>;
}

export const useCommentStore = defineStore("comments", {
  state(): {
    rootComments: Comment[];
    postId: string;
    childComments: Map<number, Comment[]>;
  } {
    return {
      rootComments: [],
      postId: "",
      childComments: new Map(),
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
    async handleDeleteComment(id: number) {
      await $fetch("/api/post/comments", {
        method: "DELETE",
      });
    },

    async handleAddComment(text: string, replyOf: null | number) {
      try {
        const { data } = await $fetch<{ data: Comment[] }>(
          "/api/post/comments",
          {
            method: "POST",
            body: {
              text: text,
              postId: this.postId,
              replyOf,
            },
          }
        );

        if (replyOf === null) this.rootComments.push(...data);
        else {
          if (this.childComments.has(replyOf))
            this.childComments.get(replyOf)?.push(...data);
          else this.childComments.set(replyOf, data);
        }
      } catch (err) {
      } finally {
      }
    },
  },
});
