import { $fetch } from "ohmyfetch";

const apiBaseUrl = "http://localhost:8787";

export async function updateView(postSlug: string): Promise<{ views: number }> {
  return $fetch(`/views/${postSlug}`, {
    method: "PUT",
    baseURL: apiBaseUrl,
  });
}

export async function getCurrentPlayingSong(): Promise<PlayingResponse> {
  return $fetch(`/spotify`, {
    method: "GET",
    baseURL: apiBaseUrl,
  });
}
