import type { BlogPost } from "#shared/types/blog";

export default defineCachedEventHandler(
  async (event): Promise<BlogPost[]> => {
    const { dataSourceId } = useRuntimeConfig(event).nuxtNotion;

    const data = await useNotionClient().dataSources.query({
      data_source_id: dataSourceId,
      filter: publishedFilter,
      sorts: [
        {
          property: "published",
          direction: "descending",
        },
      ],
      page_size: 25,
    });

    return transformPageResult(data);
  },
  { maxAge: 900, swr: true }
);
