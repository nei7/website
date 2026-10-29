export default defineCachedEventHandler(
  async (event) => {
    const siteUrl = getSiteUrl(event);
    const [posts, notes] = await Promise.all([
      getCollectionItems(event, "posts"),
      // A notes outage (unset id, database not shared) must not take the whole sitemap down.
      getCollectionItems(event, "notes").catch((error) => {
        console.error("[sitemap] notes collection unavailable", error);
        return [];
      }),
    ]);

    const staticPages = ["/", "/blog", "/notes", "/projects"].map(
      (path) => `<url><loc>${siteUrl}${path}</loc></url>`
    );
    const postPages = posts.map(
      (post) =>
        `<url><loc>${siteUrl}/blog/${post.slug}</loc><lastmod>${post.lastEditedTime.slice(0, 10)}</lastmod></url>`
    );
    const notePages = notes.map(
      (note) =>
        `<url><loc>${siteUrl}/notes/${note.slug}</loc><lastmod>${note.lastEditedTime.slice(0, 10)}</lastmod></url>`
    );

    setResponseHeader(event, "content-type", "application/xml; charset=utf-8");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...postPages, ...notePages].join("\n")}
</urlset>`;
  },
  { group: "notion-derived", name: "sitemap", maxAge: 3600, swr: true }
);
