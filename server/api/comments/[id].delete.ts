import { eq } from "drizzle-orm";
import { comments } from "../../db/schema";

/** DELETE /api/comments/:id — soft-deletes own comments; admins may delete any. */
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const id = getRouterParam(event, "id") ?? "";

  const found = await getComment(id);
  if (!found || found.comment.deletedAt) throw notFound("Comment not found");
  if (found.author.id !== user.id && !isAdmin(event, user)) {
    throw forbidden("You can only delete your own comments");
  }

  await db.update(comments).set({ deletedAt: new Date() }).where(eq(comments.id, id));
  return { deleted: true };
});
