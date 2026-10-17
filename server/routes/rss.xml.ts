// Cached in the `notion-derived` group so the Notion webhook clears it together
// with the collection it is built from.
export default defineCachedEventHandler(
  async (event) => {
    const siteUrl = getSiteUrl(event);
    const { site } = useAppConfig();
    const posts = await getCollectionItems(event, "posts");

    const items = posts
      .map((post) => {
        const link = `${siteUrl}/blog/${post.slug}`;
        const categories = post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("");
        const pubDate = post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : "";
        return `<item><title>${escapeXml(post.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid>${pubDate}<description>${escapeXml(post.description)}</description>${categories}</item>`;
      })
      .join("");

    setResponseHeader(event, "content-type", "application/rss+xml; charset=utf-8");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escapeXml(site.name)}</title>
<link>${siteUrl}</link>
<description>${escapeXml(site.description)}</description>
<language>en</language>
<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;
  },
  { group: "notion-derived", name: "rss", maxAge: 3600, swr: true }
);
