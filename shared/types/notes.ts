import type {
  NotionBlock,
  NotionCollectionItem,
  NotionCollectionProps,
  NotionCollectionTag,
} from "@nei7/nuxt-notion/types";

export type NoteItem = NotionCollectionItem<NotionCollectionProps<"notes">>;

/** A note with its block tree, as served by `GET /api/notes`. */
export type NoteEntry = NoteItem & { blocks: NotionBlock[] };

export interface NotesFeed {
  /** The newest `NOTES_FEED_LIMIT` published notes, with content. */
  notes: NoteEntry[];
  /** Tag counts across every published note. */
  tags: NotionCollectionTag[];
  total: number;
}

/** Body of `POST /api/notes`. */
export interface CreateNoteInput {
  title: string;
  body: string;
  /** Comma-separated; parsed with `parseTagList` on the server. */
  tags: string;
}

export interface CreatedNote {
  id: string;
  slug: string;
  /** The page on notion.so. */
  url: string;
}
