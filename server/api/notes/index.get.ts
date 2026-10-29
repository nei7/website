import type { NoteItem, NotesFeed } from "#shared/types/notes";

/**
 * GET /api/notes — the newest published notes with their block trees, plus the
 * tag counts of every note. Cached in the `notion-derived` group, which
 * `invalidateNotionCache` (the webhook and POST /api/notes) clears.
 */
export default defineCachedEventHandler(
  async (event): Promise<NotesFeed> => {
    const items = (await getCollectionItems(event, "notes")) as NoteItem[];
    // Bounded fan-out: block trees are cached per page, but a cold cache means Notion calls.
    const notes = await mapLimit(items.slice(0, NOTES_FEED_LIMIT), 4, async (item) => ({
      ...item,
      blocks: (await getCollectionItem(event, "notes", item.slug))?.blocks ?? [],
    }));
    return { notes, tags: getCollectionTags(items), total: items.length };
  },
  // Constant key: the handler ignores the query string, so `?x=1` must not add cache entries.
  { group: "notion-derived", name: "notes-feed", getKey: () => "feed", maxAge: 3600, swr: true }
);
