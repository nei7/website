interface PageSeoOptions {
  /** Page title without the site suffix; omit on the home page. */
  title?: string;
  description: string;
  /** Path starting with "/", used for the canonical URL. */
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
}

/** Resolves the public origin: configured `siteUrl`, otherwise the current request's. */
export function useSiteUrl() {
  const config = useRuntimeConfig();
  const requestUrl = useRequestURL();
  return (config.public.siteUrl || requestUrl.origin).replace(/\/$/, "");
}

export function usePageSeo(options: PageSeoOptions) {
  const { site } = useAppConfig();
  const siteUrl = useSiteUrl();

  const url = siteUrl + options.path;
  const image = options.image
    ? options.image.startsWith("http")
      ? options.image
      : siteUrl + options.image
    : undefined;
  const title = options.title ?? site.name;

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: title,
    ogDescription: options.description,
    ogType: options.type ?? "website",
    ogUrl: url,
    ogImage: image,
    articlePublishedTime: options.publishedTime ?? undefined,
    articleModifiedTime: options.modifiedTime ?? undefined,
    twitterTitle: title,
    twitterDescription: options.description,
    twitterImage: image,
    twitterCard: image ? "summary_large_image" : "summary",
  });

  useHead({
    link: [{ rel: "canonical", href: url }],
  });
}
