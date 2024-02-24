import { defineStore } from "pinia";

export interface Comment {
  _id: string;
  username: string;
  data: string;
  reply_of: null | string;
  avatar_url: string;
  loved: number;
  post_id: string;
  profile_url: string;
  created_at: number;
  user_id: string;
}

export interface CommentTreeNode {
  comment: Comment;
  children: Array<CommentTreeNode>;
}

export const useCommentStore = defineStore("comments", {
  state(): {
    rootComments: Comment[];
    childComments: Map<string, Comment[]>;
    postId: string;
    replyComment: Comment | null;
  } {
    return {
      rootComments: [],
      postId: "",
      childComments: new Map(),
      replyComment: null
    };
  },
  getters: {
    getChildComments: (state) => {
      return (id: string) => state.childComments.get(id);
    }
  },

  actions: {
    async fetchComments(postId: string) {
      this.childComments = new Map();
      this.rootComments = [];

      const { data: comments } = await useCachedFetch<Comment[] | undefined>(`/api/post/comments?postId=${postId}`);

      if (!comments.value) return;

      this.rootComments = comments.value.filter((comment) => comment.reply_of === null);

      this.postId = postId;

      comments.value.forEach((comment) => {
        if (comment.reply_of === null) return;

        if (this.childComments.has(comment.reply_of)) {
          this.childComments.get(comment.reply_of)?.push(comment);
        } else {
          this.childComments.set(comment.reply_of, [comment]);
        }
      });
    },

    async handleAddComment(text: string, user_id: string) {
      try {
        const data = await $fetch<Comment>("/api/post/comments", {
          method: "POST",
          body: {
            data: text,
            post_id: this.postId,
            user_id,
            reply_of: this.replyComment?._id
          }
        });

        if (this.replyComment === null) this.rootComments.unshift(data);
        else if (this.childComments.has(this.replyComment._id)) this.childComments.get(this.replyComment._id)?.push(data);
        else this.childComments.set(this.replyComment._id, [data]);
      } catch (err) {}
    },

    async handleDeleteComment(commentId: string, replyOf: string | null) {
      try {
        await $fetch(`/api/post/comments?id=${commentId}`, {
          method: "DELETE"
        });

        if (replyOf === null) removeCommentById(commentId, this.rootComments);
        else {
          const comments = this.childComments.get(replyOf);
          if (comments) removeCommentById(commentId, comments);
        }
      } catch (err) {}
    }
  }
});

function removeCommentById(id: string, comments: Comment[]) {
  return comments.splice(
    comments.findIndex((comment) => comment._id === id),
    1
  );
}
