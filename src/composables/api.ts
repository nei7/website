import { $fetch } from "ohmyfetch";
import type { PlayingResponse } from "../@types/spotify";
import type { Activity, IWorkout } from "../@types/stats";

const apiBaseUrl =
  import.meta.env.VITE_API_URL?.toString() || "http://api.fszarek.me";

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

export async function getStats(): Promise<Activity[]> {
  return $fetch(`/stats`, {
    method: "GET",
    baseURL: apiBaseUrl,
  });
}

export async function getWorkouts(): Promise<IWorkout[]> {
  return $fetch(`/stats/workouts`, {
    method: "GET",
    baseURL: apiBaseUrl,
  });
}
