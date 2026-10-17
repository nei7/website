interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

const notPlaying = {
  isPlaying: false as const,
  songUrl: null,
  name: null,
  artist: null,
};

const getAccessToken = (config: SpotifyConfig) => {
  const params = new URLSearchParams();

  params.set("grant_type", "refresh_token");
  params.set("refresh_token", config.refreshToken);

  // btoa instead of Buffer: works on Workers without node compat
  const basicAuth = btoa(`${config.clientId}:${config.clientSecret}`);

  return $fetch<{ access_token: string }>(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: params,
    }
  );
};

const getNowPlaying = async (config: SpotifyConfig) => {
  if (!config.clientId || !config.clientSecret || !config.refreshToken) return notPlaying;

  try {
    const { access_token } = await getAccessToken(config);

    const response = await $fetch<{
      is_playing: boolean;
      item: {
        name: string;
        external_urls: { spotify: string };
        artists: { name: string }[];
      };
    }>("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response?.item) return notPlaying;

    return {
      isPlaying: response.is_playing,
      songUrl: response.item.external_urls.spotify,
      name: response.item.name,
      artist: response.item.artists.map((artist) => artist.name),
    };
  } catch {
    return notPlaying;
  }
};

// Short cache: one Spotify round-trip per 30 s instead of one per visitor.
export default defineCachedEventHandler(
  (event) => getNowPlaying(useRuntimeConfig(event).spotify),
  { group: "site", name: "spotify", maxAge: 30, swr: false }
);
