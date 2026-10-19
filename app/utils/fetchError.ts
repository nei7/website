/** Message of a failed `$fetch` call: the API's own `message`, otherwise a generic fallback. */
export function fetchErrorMessage(
  error: unknown,
  fallback = "Something went wrong, please try again."
): string {
  const data = (error as { data?: { message?: unknown; statusMessage?: unknown } } | null)?.data;
  const message = data?.message || data?.statusMessage;
  return typeof message === "string" && message ? message : fallback;
}
