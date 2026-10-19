/** GitHub avatars accept an `s` (size) parameter; other hosts get the URL unchanged. */
export function avatarUrl(url: string | null | undefined, size: number): string | null {
  if (!url) return null;
  if (!url.startsWith("https://avatars.githubusercontent.com/")) return url;
  const sized = new URL(url);
  sized.searchParams.set("s", String(size));
  return sized.toString();
}
