import type { ParsedPropertyValue } from "@nei7/nuxt-notion/types";

declare module "@nei7/nuxt-notion/types" {
  interface NotionCollections {
    posts: Record<string, ParsedPropertyValue>;
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
