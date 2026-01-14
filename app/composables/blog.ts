import { parseProperties } from "nuxt-notion/utils";
import {
  isFullPage,
  type QueryDataSourceParameters,
  type QueryDataSourceResponse,
} from "@notionhq/client";

import type { BlogPost } from "~/types/blog";

const data_source_id = "855b82e0-9293-4034-909b-40c31660c9d2";

const transformPageResult = (data: QueryDataSourceResponse) =>
  data.results.filter(isFullPage).map((page) => ({
    ...parseProperties<BlogPost>(page.properties),
    id: page.id,
  }));

const latestPostsQuery: QueryDataSourceParameters = {
  data_source_id,
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
};

export const getPosts = () =>
  useNotionDatabase
    .withCachedData(() => "getPosts")
    .withTransform(transformPageResult)({
    ...latestPostsQuery,
    page_size: 25,
  });

export const getFeaturedPosts = () =>
  useNotionDatabase
    .withCachedData(() => "getFeaturedPosts")
    .withTransform(transformPageResult)({
    ...latestPostsQuery,
    page_size: 1,
  });

export const getPageBySlug = async (slug: string) => {
  const { data: pages } = await getPosts();

  return computed(() =>
    pages.value ? pages.value.find((page) => page.url === slug) : undefined
  );
};

export const getPageContent = async (pageId: string) => {
  return useNotionBlocks.withCachedData()({ block_id: pageId });
};
