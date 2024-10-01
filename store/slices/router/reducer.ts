// Core
import { createReducer } from "@reduxjs/toolkit";

// Actions
import RouterActions from "./actions";

type InitState = {
  router?: string
}

const initialState: InitState = { router: undefined };

const RouterReducer = createReducer(initialState, (builder) => {
  builder.addCase(RouterActions.changeRouter, (state, action) => {
    state.router = action.payload;
  });
});

export type { InitState };
export default RouterReducer;
