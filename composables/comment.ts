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

interface AddCommentRequest {
  data: string;
  post_id: string;
  user_id: string;
  reply_of: string | undefined;
}

export async function getComments(postId: string) {
  const { data } = await useCachedFetch<Comment[] | undefined>(`/api/post/comments?postId=${postId}`);

  return data;
}

export async function addComment(req: AddCommentRequest) {
  return await $fetch<Comment>("/api/post/comments", {
    method: "POST",
    body: req
  });
}

export async function deleteComment(commentId: string) {
  return await $fetch(`/api/post/comments?id=${commentId}`, {
    method: "DELETE"
  });
}

export async function addReaction(commentId: string) {
  return await $fetch(`/api/post/comments/reaction?commentId=${commentId}`, {
    method: "POST"
  });
}
