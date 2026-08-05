import {
  APIResponseError,
  type BlockObjectResponse,
  type PartialBlockObjectResponse,
  type QueryDataSourceResponse,
} from "@notionhq/client";
import type { BlogPost } from "#shared/types/blog";

// The `url` property holds the post slug; its Notion type may be
// rich_text or url depending on how the database was set up.
const slugFilters = (slug: string) =>
  [
    { property: "url", rich_text: { equals: slug } },
    { property: "url", url: { equals: slug } },
  ] as const;

export default defineCachedEventHandler(
  async (
    event
  ): Promise<{
    post: BlogPost;
    blocks: (BlockObjectResponse | PartialBlockObjectResponse)[];
  }> => {
    const slug = getRouterParam(event, "slug");
    if (!slug) throw createError({ statusCode: 400 });

    const client = useNotionClient();
    const { dataSourceId } = useRuntimeConfig(event).nuxtNotion;

    let pages: QueryDataSourceResponse | undefined;
    for (const slugFilter of slugFilters(slug)) {
      try {
        pages = await client.dataSources.query({
          data_source_id: dataSourceId,
          filter: { and: [publishedFilter, slugFilter] },
          page_size: 1,
        });
        break;
      } catch (err) {
        if (APIResponseError.isAPIResponseError(err) && err.code === "validation_error")
          continue;
        throw err;
      }
    }

    const [post] = pages ? transformPageResult(pages) : [];
    if (!post)
      throw createError({ statusCode: 404, message: "Post not found" });

    const blocks: (BlockObjectResponse | PartialBlockObjectResponse)[] = [];
    let cursor: string | undefined;
    do {
      const res = await client.blocks.children.list({
        block_id: post.id,
        page_size: 100,
        start_cursor: cursor,
      });
      blocks.push(...res.results);
      cursor = res.has_more && res.next_cursor ? res.next_cursor : undefined;
    } while (cursor);

    return { post, blocks };
  },
  { maxAge: 1800, swr: true }
);
