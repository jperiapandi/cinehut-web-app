import { useEffect, useState } from "react";
import { APIHookState } from "../types/APIHookState";
import type { GenreAPIResp } from "../types/genre";
import TMDBService from "../services/TMDBSvc";

const useMovieGenres = (language: string): APIHookState<GenreAPIResp> => {
  const [state, setState] = useState<APIHookState<GenreAPIResp>>(
    APIHookState.getDefaultState()
  );

  useEffect(() => {
    setState(APIHookState.getLoadingState());

    TMDBService.genre
      .getMoviesGenres(language)
      .then((result) => {
        setState(APIHookState.getSuccessState(result));
      })
      .catch((err) => {
        console.error(err);
        
        setState(APIHookState.getFailureState(err.message));
      });
  }, [language]);

  return state;
};

export default useMovieGenres;
