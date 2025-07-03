import type { Genre } from "./genre";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  original_language: string;
  original_title: string;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  release_date: string;

  //custom fields
  genres: Genre[];
};

export type MovieAPIResp = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
};
