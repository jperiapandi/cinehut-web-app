import { Language } from "../languages";
import type { GenreAPIResp } from "../types/genre";
import type { MovieAPIResp } from "../types/movie";

const TMDBService = {
  discover: {
    getMovie: async (page: number = 1, language: string, year: string) => {
      const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
      const apiToken = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN;
      const queryParams = new URLSearchParams({
        page: page + "",
        include_adult: "false",
        with_original_language: language,
      });

      if (year.startsWith("before")) {
        queryParams.set(
          "primary_release_date.lte",
          year.split("before")[1] + "-01-01"
        );
      } else {
        queryParams.set("primary_release_year", year);
      }
      const url: string = `${baseUrl}/discover/movie?${queryParams.toString()}`;

      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        throw new Error(`GetMovie Failed. status=${resp.status}`);
      }

      const result = (await resp.json()) as MovieAPIResp;
      console.log(result);

      return result;
    },
  },

  genre: {
    getMoviesGenres: async (language: string): Promise<GenreAPIResp> => {
      console.log(`getMoviesGenres : ${language}`);

      const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
      const apiToken = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN;

      const url = `${baseUrl}/genre/movie/list?language=${language}`;

      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      if (!resp.ok) {
        throw new Error(`Error while fetching genres.`);
      }

      const result = (await resp.json()) as GenreAPIResp;
      if (result.genres.filter((g) => g.name != null).length == 0) {
        console.warn(
          `All Genres are null. System will try again using English`,
          this
        );

        return TMDBService.genre.getMoviesGenres(Language.ENGLISH.code);
      }
      console.log(result);

      return result;
    },
  },
};

export default TMDBService;
