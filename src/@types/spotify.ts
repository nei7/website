export interface PlayingResponse {
  timestamp: number;
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: "playlist";
    uri: string;
  };
  progress_ms: 143026;
  item: {
    album: {
      album_type: "album";
      artists: Artist[];
      href: string;
      id: string;
      images: Image[];
      name: string;
      release_date: string;
      release_date_precision: "year";
      total_tracks: 19;
      type: "album";
      uri: string;
    };
    artists: Artist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: null;
    track_number: number;
    type: "track";
    uri: string;
    external_urls: {
      spotify: string;
    };
  } | null;
  currently_playing_type: "track" | "ad";
  actions: {
    disallows: {
      resuming: boolean;
    };
  };
  is_playing: boolean;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}
