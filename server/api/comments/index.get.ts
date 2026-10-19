import type { CommentsResponse } from "#shared/types/comments";

/** GET /api/comments?post=<slug> — every live comment of a post, oldest first. */
export default defineEventHandler(async (event): Promise<CommentsResponse> => {
  const slug = parsePostSlug(getQuery(event).post);
  const { user } = await getUserSession(event);

  const rows = pruneDeleted(await listComments(slug));

  // Permissions in the payload depend on the viewer, so never let a shared cache keep it.
  setResponseHeader(event, "Cache-Control", "private, no-store");

  return {
    comments: rows.map((row) => serializeComment(event, row, user)),
    total: rows.filter(({ comment }) => !comment.deletedAt).length,
  };
});
