export interface Result<T> {
  success: boolean;
  data: T | null;
  message?: string;
}

export interface RandomEpisode {
  seriesId: number;
  season: number;
  episode: number;
  name: string;
  overview: string;
  imagePath?: string;
  episodeType?: string;
  runtime?: number;
}

export interface SearchResult<T> {
  page: number;
  totalPages: number;
  totalResults: number;
  results: T[];
}

export interface TvShow {
  id: number;
  name: string;
  posterPath?: string;
  firstAirDate?: string;
}

export interface TmdbEpisode {
  show_id: number;
  episode_number: number;
  name: string;
  overview: string;
  still_path?: string;
  episode_type?: string;
  runtime?: number;
}

export interface TvShow {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
}
