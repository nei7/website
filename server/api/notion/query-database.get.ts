import { Client } from "@notionhq/client";

export default cachedEventHandler(async (event) => {
  const query = getQuery(event as any);

  const notion = new Client({ auth: process.env.NOTION_API_TOKEN });

  const size = query.size?.toString();
  const response = await notion.databases.query({
    database_id: process.env.NOTION_POST_DATABASE as string,

    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
    page_size: size ? parseInt(size) : undefined,
  });

  return response;
});
