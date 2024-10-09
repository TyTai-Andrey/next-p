// Core
import {
  all,
  call,
  takeLatest,
} from "redux-saga/effects";

// Types
import GamesTypes from "@store/slices/games/types";

// Workers
import fetchGames from "@store/slices/games/workers";

function* watchFetchGames() {
  yield takeLatest(GamesTypes.FETCH_GAMES_ASYNC, fetchGames);
}

function* watchGames() {
  yield all([call(watchFetchGames)]);
}

export default watchGames;
