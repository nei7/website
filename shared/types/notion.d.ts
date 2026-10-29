import type { DateResponse, ParsedPropertyValue } from "@nei7/nuxt-notion/types";

declare module "@nei7/nuxt-notion/types" {
  interface NotionCollections {
    posts: Record<string, ParsedPropertyValue>;
    notes: {
      title: string;
      /** Empty when the note was created in Notion without one (the item slug is then the page id). */
      slug: string;
      tags: string[];
      published: boolean;
      date: DateResponse | null;
    };
    projects: {
      name: string;
      description: string;
      tech: string[];
      repo: string | null;
      demo: string | null;
      year: number | null;
      status: "Active" | "Archived" | null;
      featured: boolean;
      published: boolean;
      order: number | null;
    };
  }
}

export {};
