import { parseProperties } from "@nei7/nuxt-notion/utils";
import { isFullPage, type QueryDataSourceResponse } from "@notionhq/client";
import type { BlogPost } from "#shared/types/blog";

export const publishedFilter = {
  property: "status",
  status: {
    equals: "Published",
  },
} as const;

export const transformPageResult = (
  data: QueryDataSourceResponse
): BlogPost[] =>
  data.results.filter(isFullPage).map((page) => ({
    ...parseProperties<BlogPost>(page.properties),
    id: page.id,
  }));
