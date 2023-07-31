type ExternalUrls = {
  spotify: string;
};

export interface CurrentSongResponse {
  is_playing: boolean;
  item: {
    album: { external_urls: ExternalUrls; name: string };
    artists: {
      external_urls: ExternalUrls;
      name: string;
    }[];

    external_urls: ExternalUrls;
    name: string;
  };
}
