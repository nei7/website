export interface CommentAuthor {
  id: string;
  login: string;
  name: string | null;
  avatar: string | null;
  /** The site owner, i.e. one of `comments.adminLogins`. */
  owner: boolean;
}

export interface PostComment {
  id: string;
  postSlug: string;
  /** Root comment id for replies, `null` for root comments. */
  parentId: string | null;
  body: string;
  createdAt: string;
  updatedAt: string | null;
  /** A removed root comment kept as a placeholder because it still has replies. */
  deleted: boolean;
  author: CommentAuthor | null;
  /** What the requesting user may do with this comment. */
  canEdit: boolean;
  canDelete: boolean;
}

export interface CommentsResponse {
  /** Flat, oldest first; replies carry their root's id in `parentId`. */
  comments: PostComment[];
  /** Live (non-deleted) comments including replies. */
  total: number;
}

export interface CommentThread {
  root: PostComment;
  replies: PostComment[];
}
