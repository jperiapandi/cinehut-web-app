import { useEffect, useState } from "react";
import { APIHookState } from "../types/APIHookState";
import type { MovieAPIResp } from "../types/movie";
import TMDBService from "../services/TMDBSvc";

export default function useDiscoverMovie(
  language: string,
  year: string,
  page: number = 1
): APIHookState<MovieAPIResp> {
  const [state, setState] = useState<APIHookState<MovieAPIResp>>(
    APIHookState.getDefaultState()
  );

  useEffect(() => {
    setState(APIHookState.getLoadingState());

    //Fetch data from external API
    TMDBService.discover
      .getMovie(page, language, year)
      .then((apiResp) => {
        setState(APIHookState.getSuccessState(apiResp));
      })
      .catch((err) => {
        console.error(err);

        setState(
          APIHookState.getFailureState(`Error while loading Movie API.`)
        );
      });
  }, [language, year, page]);

  return state;
}
