import { eq } from "drizzle-orm";
import { comments } from "../../db/schema";

/** PATCH /api/comments/:id { body } — authors may edit their own comments. */
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const id = getRouterParam(event, "id") ?? "";
  const body = parseCommentBody(((await readBody(event)) ?? {}).body);

  const found = await getComment(id);
  if (!found || found.comment.deletedAt) throw notFound("Comment not found");
  if (found.author.id !== user.id) throw forbidden("You can only edit your own comments");

  await db.update(comments).set({ body, updatedAt: new Date() }).where(eq(comments.id, id));

  const updated = await getComment(id);
  if (!updated) throw createError({ statusCode: 500, statusMessage: "Comment was not saved" });
  return serializeComment(event, updated, user);
});
