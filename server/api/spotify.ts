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

  const basicAuth = Buffer.from(
    `${config.clientId}:${config.clientSecret}`
  ).toString("base64");

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

    if (!response) return notPlaying;

    return {
      isPlaying: response.is_playing,
      songUrl: response.item.external_urls.spotify,
      name: response.item.name,
      artist: response.item.artists.map(
        (artist: { name: string }) => artist.name
      ),
    };
  } catch {
    return notPlaying;
  }
};

export default eventHandler((event) =>
  getNowPlaying(useRuntimeConfig(event).spotify)
);
