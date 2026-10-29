/** Limits shared by the note form and `POST /api/notes`. */
export const NOTE_TITLE_MAX_LENGTH = 120;
export const NOTE_MAX_LENGTH = 5000;
export const NOTE_MAX_TAGS = 5;
export const NOTE_TAG_MAX_LENGTH = 30;
/** Notion accepts at most 100 child blocks when creating a page. */
export const NOTE_MAX_PARAGRAPHS = 100;
/** How many of the newest notes /notes renders with their text; older ones keep their permalink. */
export const NOTES_FEED_LIMIT = 30;

/**
 * `"linux, TIL,linux "` → `["linux", "TIL"]`: trimmed, inner whitespace collapsed,
 * de-duplicated case-insensitively with the first spelling kept.
 */
export function parseTagList(raw: string): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const part of raw.split(",")) {
    const tag = part.replace(/\s+/g, " ").trim();
    const key = tag.toLowerCase();
    if (!tag || seen.has(key)) continue;
    seen.add(key);
    tags.push(tag);
  }
  return tags;
}
