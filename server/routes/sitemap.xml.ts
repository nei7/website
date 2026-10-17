export default defineCachedEventHandler(
  async (event) => {
    const siteUrl = getSiteUrl(event);
    const posts = await getCollectionItems(event, "posts");

    const staticPages = ["/", "/blog", "/projects"].map(
      (path) => `<url><loc>${siteUrl}${path}</loc></url>`
    );
    const postPages = posts.map(
      (post) =>
        `<url><loc>${siteUrl}/blog/${post.slug}</loc><lastmod>${post.lastEditedTime.slice(0, 10)}</lastmod></url>`
    );

    setResponseHeader(event, "content-type", "application/xml; charset=utf-8");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...postPages].join("\n")}
</urlset>`;
  },
  { group: "notion-derived", name: "sitemap", maxAge: 3600, swr: true }
);
