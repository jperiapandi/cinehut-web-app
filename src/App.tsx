import "./App.css";
import MovieCard from "./components/MovieCard";

import useDiscoverMovie from "./hooks/useDiscoverMovie";
import Filter from "./components/Filter";
import useMovieGenres from "./hooks/useMovieGenres";
import { useEffect, useRef, useState, type MouseEventHandler } from "react";
import { Language } from "./languages";
import type { Genre } from "./types/genre";
import { years } from "./constants";
import MatRoundButton from "./components/MatRoundButton";

function App() {
  const elmRef = useRef<HTMLDivElement>(null);
  const loadingProgress = useRef<HTMLDialogElement>(null);

  const [language, setLanguage] = useState(Language.ENGLISH.code);
  const [year, setYear] = useState(years[0].value);
  const [page, setPage] = useState(1);

  const movieApi = useDiscoverMovie(language, year, page);
  const genreApi = useMovieGenres(Language.ENGLISH.code);

  useEffect(() => {
    
    if (elmRef.current) {
      elmRef.current.scroll({ top: 90, left: 0, behavior: "instant" });
    }
  }, [page]);

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

  const handleNextPageClick: MouseEventHandler<HTMLElement> = (e) => {
    const t = movieApi.data?.total_pages ?? 0;
    if (page < t) {
      setPage((p) => p + 1);
    }
  };

  const handlePrevPageClick: MouseEventHandler<HTMLElement> = (e) => {
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

      {movieApi.state == "success" && (
        <div className="container-rc-small" ref={elmRef} key={0}>
          <div className="movies-container">
            {movieApi.data?.results.map((m) => {
              return <MovieCard movie={m} key={m.id} />;
            })}
          </div>
        </div>
      )}

      {movieApi.state == "loading" && (
        <div className="container-rc-small" style={{ height: "100vh" }} key={1}>
          <div>Loading... please wait!</div>
        </div>
      )}

      <dialog open className="bottom-sheet-dialog">
        <div className="info-1">
          There are {movieApi.data?.total_results} movies.
        </div>

        <div className="movies-paginator">
          <MatRoundButton
            icon="chevron_left"
            onClick={handlePrevPageClick}
            disabled={page == 1}
          />

          <span className="paginator-label">
            Page {page} of {movieApi.data?.total_pages}
          </span>

          <MatRoundButton
            icon="chevron_right"
            disabled={false}
            onClick={handleNextPageClick}
          />
        </div>
      </dialog>
    </>
  );
}

export default App;
