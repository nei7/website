import type { CreatedNote } from "#shared/types/notes";

/** POST /api/notes { title, body, tags } — creates a page in the Notes database (site owner only). */
export default defineEventHandler(async (event): Promise<CreatedNote> => {
  await requireOwner(event);
  const { title, body, tags } = parseNoteInput((await readBody(event)) ?? {});
  const children = textToParagraphBlocks(body);

  // 503 until NUXT_NUXT_NOTION_COLLECTIONS_NOTES_DATA_SOURCE_ID is set.
  const { dataSourceId } = getCollectionConfig(event, "notes");
  const client = useNotionClient(event);

  let slug: string;
  let page: Awaited<ReturnType<typeof client.pages.create>>;
  try {
    slug = await uniqueNoteSlug(client, dataSourceId, slugify(title));
    page = await client.pages.create({
      parent: { type: "data_source_id", data_source_id: dataSourceId },
      properties: {
        title: { title: [{ type: "text", text: { content: title } }] },
        slug: { rich_text: [{ type: "text", text: { content: slug } }] },
        tags: { multi_select: tags.map((name) => ({ name })) },
        published: { checkbox: true },
      },
      children,
    });
  } catch (error) {
    throw toNotionError(error);
  }

  // Let Notion's index catch up, then drop the cached list so the next render includes the note.
  await waitUntilQueryable(client, dataSourceId, slug);
  await invalidateNotionCache({ collection: "notes" });

  setResponseStatus(event, 201);
  return {
    id: page.id,
    slug,
    url: "url" in page ? page.url : `https://www.notion.so/${page.id.replace(/-/g, "")}`,
  };
});
