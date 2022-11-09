import { $fetch } from "ohmyfetch";

const apiBaseUrl = "https://api.fszarek.me";

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

export async function registerToNewsletter(email: string) {
  return $fetch(`/newsletter`, {
    method: "POST",
    body: {
      email,
    },
    baseURL: apiBaseUrl,
  });
}
