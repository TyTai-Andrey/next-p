// Core
import { createAction } from "@reduxjs/toolkit";

// Types
import GamesTypes from "./types";

const GamesActions = {
  // Async
  fetchGamesAsync: createAction(GamesTypes.FETCH_GAMES_ASYNC, (filter?: IGamesListRequest) => ({ payload: filter })),
  // Sync
  fetchGamesFailure: createAction(GamesTypes.FETCH_GAMES_FAILURE),
  fetchGamesRequest: createAction(GamesTypes.FETCH_GAMES_REQUEST),
  fetchGamesSuccess: createAction(GamesTypes.FETCH_GAMES_SUCCESS, (data: IListResult<Game>) => ({ payload: data })),

  setGames: createAction(GamesTypes.SET_GAMES, (data: IListResult<Game>) => ({ payload: data })),
};

export default GamesActions;
