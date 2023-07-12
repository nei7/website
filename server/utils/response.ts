import { H3Event, setResponseStatus, setResponseHeaders } from "h3";

export function makeResponse(
  event: H3Event,
  data: any,
  options?: { headers?: Record<string, string>; code?: number }
) {
  if (options) {
    const { headers, code } = options;
    if (code) setResponseStatus(event, code);
    if (headers) setResponseHeaders(event, headers);
  }

  return data;
}
