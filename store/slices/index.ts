/* eslint-disable import/no-cycle */
// Core
import { all, call } from "redux-saga/effects";
import { combineReducers } from "redux";

// Reducers
import GamesReducer from "./games/reducer";
import RouterReducer from "./router/reducer";

// Watchers
import watchGames from "./games/watchers";

const rootReducer = () => combineReducers({ games: GamesReducer, router: RouterReducer });

type RootState = ReturnType<ReturnType<typeof rootReducer>>;

function* rootSaga() {
  yield all([call(watchGames)]);
}

export type { RootState };
export { rootReducer, rootSaga };
