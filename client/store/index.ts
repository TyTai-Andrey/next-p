// redux
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// local imports
// store
import {
  RootState,
  rootReducer,
  rootSaga,
} from "@store/slices";

// interfaces
import MyStore from "@store/interfaces";

const sagaMiddleware = createSagaMiddleware();

let store: MyStore | undefined;

const initializeStore = (preloadedState: RootState) => {
  if (store) return store;

  store = configureStore({
    middleware: [sagaMiddleware],
    preloadedState,
    reducer: rootReducer(),
  });
  sagaMiddleware.run(rootSaga);

  return store;
};

export default initializeStore;
