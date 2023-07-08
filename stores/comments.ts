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
  children: Array<Comment>;
}

export const useCommentStore = defineStore("comments", {
  state(): {
    comments: Comment[];
    postId: string;
  } {
    return {
      comments: [],
      postId: "",
    };
  },
  getters: {
    commentTreeList: (state): Array<CommentTreeNode> => {
      const roots = state.comments.filter(
        (comment) => comment.reply_of === null
      );

      const childrens: ReplyComment[] = state.comments.filter(
        (comment): comment is ReplyComment => comment.reply_of !== null
      );

      const treeMap = new Map<
        number,
        { comment: Comment; children: Array<Comment> }
      >(roots.map((comment) => [comment.id, { comment, children: [] }]));

      for (const replyComment of childrens) {
        if (treeMap.has(replyComment.reply_of)) {
          const rootComment = treeMap.get(replyComment.reply_of)!;

          treeMap.set(replyComment.reply_of, {
            ...rootComment,
            children: [...rootComment.children, replyComment],
          });
        }
      }

      return Array.from(treeMap.values()).reverse();
    },
  },

  actions: {
    async fetchList(postId: string) {
      const { data: comments } = await useCachedFetch<{ data: Comment[] }>(
        `/api/post/comments?postId=${postId}`
      );

      this.comments = comments.value.data;
      this.postId = postId;
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

        this.comments.push(...data);
      } catch (err) {
      } finally {
      }
    },
  },
});
