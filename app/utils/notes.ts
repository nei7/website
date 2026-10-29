import type { NotionBlock } from "@nei7/nuxt-notion/types";

/** Plain text of the first non-empty paragraph, for meta descriptions. */
export function noteExcerpt(blocks: NotionBlock[], max = 160): string {
  for (const block of blocks) {
    if (block.type !== "paragraph") continue;
    const text = block.paragraph.rich_text
      .map((part) => part.plain_text)
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
  }
  return "";
}
