// Core
import { all, call } from "redux-saga/effects";
import { combineReducers } from "redux";

// Reducers
import GamesReducer from "@store/slices/games/reducer";
import RouterReducer from "@store/slices/router/reducer";

// Watchers
import watchGames from "@store/slices/games/watchers";

const rootReducer = () => combineReducers({
  games: GamesReducer,
  router: RouterReducer,
});

type RootState = ReturnType<ReturnType<typeof rootReducer>>;

function* rootSaga() {
  yield all([call(watchGames)]);
}

export type { RootState };
export { rootReducer, rootSaga };
