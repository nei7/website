import { parseProperties } from "@nei7/nuxt-notion/utils";
import {
  isFullPage,
  type BlockObjectResponse,
  type ListBlockChildrenResponse,
  type PartialBlockObjectResponse,
  type QueryDataSourceParameters,
  type QueryDataSourceResponse,
} from "@notionhq/client";
import type { BlogPost } from "#shared/types/blog";

const transformPageResult = (data: QueryDataSourceResponse) =>
  data.results.filter(isFullPage).map((page) => ({
    ...parseProperties<BlogPost>(page.properties),
    id: page.id,
  }));

// data_source_id is omitted on purpose — the module's query-database route
// fills in the configured default and rejects any other id with 403
const latestPostsQuery = {
  filter: {
    property: "status",
    status: {
      equals: "Published",
    },
  },
  sorts: [
    {
      property: "published",
      direction: "descending",
    },
  ],
} as QueryDataSourceParameters;

export const getPosts = () =>
  useNotionDatabase
    .withCachedData(() => "getPosts")
    .withTransform(transformPageResult)({
    ...latestPostsQuery,
    page_size: 25,
  });

export const getPageBySlug = async (slug: string) => {
  const { data: pages } = await getPosts();

  return computed(() =>
    pages.value ? pages.value.find((page) => page.url === slug) : undefined
  );
};

export const getPageContent = (pageId: string) =>
  useAsyncData(`notion-content-${pageId}`, async () => {
    const blocks: (BlockObjectResponse | PartialBlockObjectResponse)[] = [];
    let cursor: string | undefined;

    do {
      const res = await $fetch<ListBlockChildrenResponse>(
        "/api/_notion/blocks",
        {
          query: { block_id: pageId, page_size: 100, start_cursor: cursor },
        }
      );
      blocks.push(...res.results);
      cursor = res.has_more && res.next_cursor ? res.next_cursor : undefined;
    } while (cursor);

    return blocks;
  });
