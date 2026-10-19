import { comments } from "../../db/schema";

/** POST /api/comments { post, body, parentId? } — adds a comment or a reply (signed in only). */
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const input = (await readBody(event)) ?? {};

  const slug = parsePostSlug(input.post);
  const body = parseCommentBody(input.body);
  await assertPostExists(event, slug);

  let parentId: string | null = null;
  if (input.parentId != null) {
    if (typeof input.parentId !== "string") throw badRequest("Invalid parent comment");
    const parent = await getComment(input.parentId);
    if (!parent || parent.comment.postSlug !== slug || parent.comment.deletedAt) {
      throw notFound("Parent comment not found");
    }
    // Threads are one level deep: replying to a reply attaches to its root.
    parentId = parent.comment.parentId ?? parent.comment.id;
  }

  await assertRateLimit(user.id);

  const id = crypto.randomUUID();
  try {
    await db
      .insert(comments)
      .values({ id, postSlug: slug, userId: user.id, parentId, body, createdAt: new Date() });
  } catch (error) {
    // The session outlived its `users` row (e.g. a reset local database).
    if (String(error).includes("FOREIGN KEY")) {
      await clearUserSession(event);
      throw createError({ statusCode: 401, statusMessage: "Please sign in again" });
    }
    throw error;
  }

  const created = await getComment(id);
  if (!created) throw createError({ statusCode: 500, statusMessage: "Comment was not saved" });

  setResponseStatus(event, 201);
  return serializeComment(event, created, user);
});
