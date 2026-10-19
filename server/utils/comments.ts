import type { H3Event } from "h3";
import type { User } from "#auth-utils";
import { and, asc, eq, gt, sql } from "drizzle-orm";
import type { PostComment } from "#shared/types/comments";
import { comments, users, type CommentRow, type UserRow } from "../db/schema";

/** Per user: at most `max` new comments per `windowMs`. */
const RATE_LIMIT = { max: 5, windowMs: 60_000 };

export const badRequest = (message: string) =>
  createError({ statusCode: 400, statusMessage: message, message });

export const notFound = (message: string) =>
  createError({ statusCode: 404, statusMessage: message, message });

export const forbidden = (message: string) =>
  createError({ statusCode: 403, statusMessage: message, message });

/** Normalises line endings and enforces the length limit. */
export function parseCommentBody(raw: unknown): string {
  if (typeof raw !== "string") throw badRequest("Comment body is required");
  const body = raw.replace(/\r\n?/g, "\n").trim();
  if (!body) throw badRequest("Comment cannot be empty");
  if (body.length > COMMENT_MAX_LENGTH) {
    throw badRequest(`Comments are limited to ${COMMENT_MAX_LENGTH} characters`);
  }
  return body;
}

export function parsePostSlug(raw: unknown): string {
  if (typeof raw !== "string" || !raw || raw.length > 200) throw badRequest("Post slug is required");
  return raw;
}

/** Comments can only be attached to published posts (uses the cached collection). */
export async function assertPostExists(event: H3Event, slug: string) {
  const posts = await getCollectionItems(event, "posts");
  if (!posts.some((post) => post.slug === slug)) throw notFound("Post not found");
}

export async function assertRateLimit(userId: string) {
  const since = new Date(Date.now() - RATE_LIMIT.windowMs);
  const row = await db
    .select({ count: sql<number>`count(*)` })
    .from(comments)
    .where(and(eq(comments.userId, userId), gt(comments.createdAt, since)))
    .get();

  if ((row?.count ?? 0) >= RATE_LIMIT.max) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too many comments",
      message: "You are commenting too fast, try again in a minute",
    });
  }
}

export interface CommentWithAuthor {
  comment: CommentRow;
  author: UserRow;
}

const withAuthor = () =>
  db.select({ comment: comments, author: users }).from(comments).innerJoin(users, eq(users.id, comments.userId));

export const getComment = (id: string): Promise<CommentWithAuthor | undefined> =>
  withAuthor().where(eq(comments.id, id)).get();

export const listComments = (slug: string): Promise<CommentWithAuthor[]> =>
  withAuthor().where(eq(comments.postSlug, slug)).orderBy(asc(comments.createdAt)).all();

/**
 * Drops deleted comments, except root comments that still have live replies:
 * those stay as placeholders so the thread keeps its shape.
 */
export function pruneDeleted(rows: CommentWithAuthor[]): CommentWithAuthor[] {
  const rootsWithLiveReplies = new Set(
    rows.filter(({ comment }) => !comment.deletedAt && comment.parentId).map(({ comment }) => comment.parentId)
  );
  return rows.filter(
    ({ comment }) => !comment.deletedAt || (!comment.parentId && rootsWithLiveReplies.has(comment.id))
  );
}

/** Shapes a row for the API, with permissions resolved for `viewer`. */
export function serializeComment(
  event: H3Event,
  { comment, author }: CommentWithAuthor,
  viewer: User | null | undefined
): PostComment {
  const deleted = Boolean(comment.deletedAt);
  const own = viewer?.id === author.id;

  return {
    id: comment.id,
    postSlug: comment.postSlug,
    parentId: comment.parentId,
    body: deleted ? "" : comment.body,
    createdAt: comment.createdAt.toISOString(),
    updatedAt: comment.updatedAt?.toISOString() ?? null,
    deleted,
    author: deleted
      ? null
      : {
          id: author.id,
          login: author.login,
          name: author.name,
          avatar: author.avatarUrl,
          owner: isAdmin(event, author),
        },
    canEdit: !deleted && own,
    canDelete: !deleted && (own || (viewer ? isAdmin(event, viewer) : false)),
  };
}
