import "./App.css";
import MovieCard from "./components/MovieCard";

import useDiscoverMovie from "./hooks/useDiscoverMovie";
import Filter from "./components/Filter";
import useMovieGenres from "./hooks/useMovieGenres";
import { useState, type MouseEventHandler } from "react";
import { Language } from "./languages";
import type { Genre } from "./types/genre";
import { years } from "./constants";

function App() {
  const [language, setLanguage] = useState(Language.ENGLISH.code);
  const [year, setYear] = useState(years[0].value);
  const [page, setPage] = useState(1);

  const movieApi = useDiscoverMovie(language, year, page);
  const genreApi = useMovieGenres(Language.ENGLISH.code);

  //Construct Genre list
  if (movieApi.data && genreApi.data) {
    const genreMap = new Map<number, Genre>();
    genreApi.data.genres.forEach((g) => {
      genreMap.set(g.id, g);
    });
    //
    movieApi.data.results.forEach((m) => {
      const genres = m.genre_ids
        .map((id) => genreMap.get(id))
        .filter((g) => g != undefined);
      m.genres = genres;
    });
  }

  const handleFilterChange = (filterOption) => {
    setLanguage(filterOption.language);
    setYear(filterOption.year);
    setPage(1);
  };

  const handleNextPageClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const t = movieApi.data?.total_pages ?? 0;
    if (page < t) {
      setPage((p) => p + 1);
    }
  };

  const handlePrevPageClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  };

  return (
    <>
      <header>
        <h1>CineHut</h1>
        <Filter
          onChange={handleFilterChange}
          language={language}
          year={year}
          page={1}
        />
      </header>

      <div className="container-rc-small">
        <div>
          {movieApi.state == "loading" && <div>Loading...</div>}
          {movieApi.state == "success" && (
            <>
              <div className="movies-container">
                {movieApi.data?.results.map((m) => {
                  return <MovieCard movie={m} key={m.id} />;
                })}
              </div>

              <dialog open className="bottom-sheet-dialog">
                <div>There are {movieApi.data?.total_results} movies.</div>
                <div>
                  <span>
                    Page {page} of {movieApi.data?.total_pages}
                  </span>
                </div>
                <div>
                  <button onClick={handlePrevPageClick}>Prev Page</button>
                  <button onClick={handleNextPageClick}>Next Page</button>
                </div>
              </dialog>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
