import type { CreateNoteInput } from "#shared/types/notes";

/*
 * `@notionhq/client` is only a dependency of the module, so every request type
 * is derived from the client that `useNotionClient` hands out.
 */
type NotionClient = ReturnType<typeof useNotionClient>;
type CreatePageArgs = Parameters<NotionClient["pages"]["create"]>[0];
type BlockRequest = NonNullable<CreatePageArgs["children"]>[number];
export type ParagraphBlockRequest = Extract<BlockRequest, { paragraph: unknown }>;
type RichTextRequest = ParagraphBlockRequest["paragraph"]["rich_text"][number];

/** Notion accepts at most this many characters per rich-text item. */
const RICH_TEXT_CHUNK = 2000;

export interface ParsedNote {
  title: string;
  body: string;
  tags: string[];
}

/** Validates the body of `POST /api/notes`; messages are shown in the form as-is. */
export function parseNoteInput(raw: unknown): ParsedNote {
  const input = (typeof raw === "object" && raw !== null ? raw : {}) as Partial<
    Record<keyof CreateNoteInput, unknown>
  >;

  if (typeof input.title !== "string") throw badRequest("Title is required");
  const title = input.title.replace(/\s+/g, " ").trim();
  if (!title) throw badRequest("Title is required");
  if (title.length > NOTE_TITLE_MAX_LENGTH) {
    throw badRequest(`Titles are limited to ${NOTE_TITLE_MAX_LENGTH} characters`);
  }

  if (typeof input.body !== "string") throw badRequest("Note text is required");
  const body = input.body.replace(/\r\n?/g, "\n").trim();
  if (!body) throw badRequest("Note text is required");
  if (body.length > NOTE_MAX_LENGTH) {
    throw badRequest(`Notes are limited to ${NOTE_MAX_LENGTH} characters`);
  }

  if (input.tags != null && typeof input.tags !== "string") {
    throw badRequest("Tags must be a comma-separated string");
  }
  const tags = parseTagList(input.tags ?? "");
  if (tags.length > NOTE_MAX_TAGS) throw badRequest(`Notes are limited to ${NOTE_MAX_TAGS} tags`);
  if (tags.some((tag) => tag.length > NOTE_TAG_MAX_LENGTH)) {
    throw badRequest(`Tags are limited to ${NOTE_TAG_MAX_LENGTH} characters`);
  }

  return { title, body, tags };
}

/** Letters that NFKD does not decompose into an ASCII base. */
const TRANSLITERATIONS: Record<string, string> = {
  ł: "l",
  ø: "o",
  đ: "d",
  ß: "ss",
  æ: "ae",
  œ: "oe",
  þ: "th",
  ð: "d",
};

/**
 * Lowercase ASCII slug (`[a-z0-9-]`, at most 60 characters). The module lowercases
 * slugs when it reads them and its item route only accepts `[\w.-]`, so anything
 * else would never resolve.
 */
export function slugify(title: string): string {
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .replace(/[łøđßæœþð]/g, (char) => TRANSLITERATIONS[char] ?? "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
  return slug || "note";
}

/**
 * Picks `base`, `base-2`, `base-3`… against the slugs already in Notion. Queries
 * Notion directly: the cached collection can be an hour old and only holds
 * published notes.
 */
export async function uniqueNoteSlug(
  client: NotionClient,
  dataSourceId: string,
  base: string
): Promise<string> {
  const { results } = await client.dataSources.query({
    data_source_id: dataSourceId,
    filter: { property: "slug", rich_text: { starts_with: base } },
    page_size: 100,
  });

  const taken = new Set<string>();
  for (const page of results) {
    if (page.object !== "page" || !("properties" in page)) continue;
    const slug = page.properties.slug;
    if (slug?.type !== "rich_text") continue;
    taken.add(slug.rich_text.map((part) => part.plain_text).join("").trim().toLowerCase());
  }

  if (!taken.has(base)) return base;
  for (let n = 2; ; n++) {
    const candidate = `${base}-${n}`;
    if (!taken.has(candidate)) return candidate;
  }
}

/** One paragraph block per blank-line-separated paragraph; single newlines stay inside a paragraph. */
export function textToParagraphBlocks(body: string): ParagraphBlockRequest[] {
  const paragraphs = body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  if (paragraphs.length > NOTE_MAX_PARAGRAPHS) {
    throw badRequest(`Notes are limited to ${NOTE_MAX_PARAGRAPHS} paragraphs`);
  }
  return paragraphs.map((paragraph) => ({
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: chunkRichText(paragraph) },
  }));
}

function chunkRichText(text: string): RichTextRequest[] {
  const chars = [...text];
  const chunks: RichTextRequest[] = [];
  for (let i = 0; i < chars.length; i += RICH_TEXT_CHUNK) {
    chunks.push({ type: "text", text: { content: chars.slice(i, i + RICH_TEXT_CHUNK).join("") } });
  }
  return chunks;
}

/**
 * Notion's query index lags a little behind `pages.create`. Refetching the
 * collection too early would cache a list without the new note for an hour,
 * so wait (briefly) until the page is queryable. Never throws.
 */
export async function waitUntilQueryable(
  client: NotionClient,
  dataSourceId: string,
  slug: string,
  attempts = 3
): Promise<boolean> {
  for (let attempt = 0; attempt < attempts; attempt++) {
    if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 400));
    try {
      const { results } = await client.dataSources.query({
        data_source_id: dataSourceId,
        filter: { property: "slug", rich_text: { equals: slug } },
        page_size: 1,
      });
      if (results.length > 0) return true;
    } catch {
      // A failed probe only means a possibly stale list; the note itself is saved.
    }
  }
  return false;
}

interface NotionApiError {
  code: string;
  status: number;
  message: string;
}

const isNotionApiError = (error: unknown): error is NotionApiError =>
  typeof error === "object" && error !== null && "code" in error && "status" in error;

/** Logs the Notion failure (Workers Issues groups it) and returns a safe error for the form. */
export function toNotionError(error: unknown) {
  console.error("[notes] Notion request failed", error);

  const code = isNotionApiError(error) ? error.code : null;
  const message =
    code === "restricted_resource"
      ? "The Notion integration may not insert content — enable that capability in its settings"
      : code === "object_not_found"
        ? "The Notes database is not shared with the Notion integration"
        : code === "validation_error"
          ? "Notion rejected the note; check the Notes database schema"
          : "Could not save the note to Notion, please try again";

  return createError({ statusCode: 502, statusMessage: "Could not save the note", message });
}

/** `Promise.all` with at most `limit` tasks in flight, results in input order. */
export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index] as T);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
