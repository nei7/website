import { defineStore } from "pinia";
import { type Comment, getComments, addComment, deleteComment } from "~/composables/comment";

export interface CommentTreeNode {
  comment: Comment;
  children: Array<CommentTreeNode>;
}

export const useCommentStore = defineStore("comments", {
  state(): {
    childComments: Map<string, Comment[]>;
    rootComments: Comment[];
    postId: string;
    replyComment: Comment | null;
  } {
    return {
      childComments: new Map(),
      rootComments: [],
      postId: "",
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
      this.$reset();

      const comments = await getComments(postId);
      if (!comments.value) return;

      this.rootComments = comments.value.filter((comment) => comment.reply_of === null);

      this.postId = postId;

      comments.value.forEach((comment) => {
        if (comment.reply_of === null) return;

        if (this.childComments.has(comment.reply_of)) this.childComments.get(comment.reply_of)?.push(comment);
        else this.childComments.set(comment.reply_of, [comment]);
      });
    },

    async handleAddComment(data: string, user_id: string) {
      try {
        const comment = await addComment({
          data,
          post_id: this.postId,
          user_id,
          reply_of: this.replyComment?._id
        });

        if (this.replyComment === null) this.rootComments.unshift(comment);
        else if (this.childComments.has(this.replyComment._id)) this.childComments.get(this.replyComment._id)?.push(comment);
        else this.childComments.set(this.replyComment._id, [comment]);
      } catch (err) {}
    },

    async handleDeleteComment(commentId: string, replyOf: string | null) {
      try {
        await deleteComment(commentId);

        if (replyOf === null) this.removeCommentById(commentId, this.rootComments);
        else {
          const comments = this.childComments.get(replyOf);
          if (comments) this.removeCommentById(commentId, comments);
        }
      } catch (err) {}
    },

    removeCommentById(id: string, comments: Comment[]) {
      return comments.splice(
        comments.findIndex((comment) => comment._id === id),
        1
      );
    }
  }
});
