// Core
import {
  call,
  put,
  select,
} from "redux-saga/effects";

// Api
import { getClientAxios } from "@api/BaseApi";

// Actions
import GamesActions from "@store/slices/games/actions";

// Selectors
import { getGamesNext } from "@store/slices/games/selectors";

function* fetchGames() {
  const next: string = yield select(getGamesNext);
  yield put(GamesActions.fetchGamesRequest());

  const { data } = yield call(getClientAxios.get, next);
  if (data) {
    yield put(GamesActions.fetchGamesSuccess(data));
  } else {
    yield put(GamesActions.fetchGamesFailure());
  }
}

export default fetchGames;
