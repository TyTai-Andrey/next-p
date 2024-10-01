import type { RootState } from "..";

const getGamesReducer = (store: RootState) => store.games;

const getGames = (store: RootState) => getGamesReducer(store);
const getGamesData = (store: RootState) => getGamesReducer(store).data;

const getGamesError = (store: RootState) => getGamesReducer(store).error;
const getGamesLoading = (store: RootState) => getGamesReducer(store).loading;

const getGamesNext = (store: RootState) => getGamesData(store)?.next;

const getGamesResult = (store: RootState) => getGamesData(store)?.results;
const getGamesTotal = (store: RootState) => getGamesData(store)?.count;

export {
  getGames,
  getGamesData,
  getGamesError,
  getGamesLoading,
  getGamesNext,
  getGamesResult,
  getGamesTotal,
};
