// Core
import { createReducer } from "@reduxjs/toolkit";

// Actions
import GamesActions from "./actions";

type InitState = {
  data?: {
    count: number;
    next: string | null;
    previous: string | null;
    results: null | Game[];
  };
  loading: boolean;
  error: boolean;
}

const initialState: InitState = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: null,
  },
  error: false,
  loading: false,
};

const GamesReducer = createReducer(initialState, (builder) => {
  builder.addCase(GamesActions.fetchGamesRequest, (state) => {
    state.loading = true;
    state.error = false;
  });
  builder.addCase(GamesActions.setGames, (state, action) => {
    state.data = action.payload;
    state.loading = false;
    state.error = false;
  });
  builder.addCase(GamesActions.fetchGamesSuccess, (state, action) => {
    state.data = {
      ...state.data,
      ...action.payload,
      results: [
        ...(state.data?.results || []),
        ...(action.payload.results || []),
      ],
    };
    state.loading = false;
    state.error = false;
  });

  builder.addCase(GamesActions.fetchGamesFailure, (state) => {
    state.data = undefined;
    state.loading = false;
    state.error = true;
  });
});

export type { InitState };
export default GamesReducer;
