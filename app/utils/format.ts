const longDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const monthYear = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
});

// UTC on purpose: comment timestamps are rendered on the server and hydrated
// on the client, and a local time zone would make the two disagree.
const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const parse = (iso: string) => new Date(iso);

/** "18 June 2023" */
export const formatDate = (iso: string) => longDate.format(parse(iso));

/** "18 Jun 2023" */
export const formatShortDate = (iso: string) => shortDate.format(parse(iso));

/** "Jun 2023" */
export const formatMonthYear = (iso: string) => monthYear.format(parse(iso));

export const yearOf = (iso: string | null) =>
  iso ? String(parse(iso).getUTCFullYear()) : "Undated";

const count = new Intl.NumberFormat("en-GB");

/** "12,345" */
export const formatCount = (value: number) => count.format(value);

/** "view" or "views", to follow a formatted count. */
export const pluralize = (value: number, noun: string) => (value === 1 ? noun : `${noun}s`);
