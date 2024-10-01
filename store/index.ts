// redux
import { CombinedState, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware, { AnyAction, SagaMiddleware } from "redux-saga";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

// store
import {
  RootState,
  rootReducer,
  rootSaga,
} from "@store/slices";

const sagaMiddleware = createSagaMiddleware();

type MyStore = ToolkitStore<CombinedState<RootState>, AnyAction, SagaMiddleware<object>[]>

let store: MyStore | undefined;

const initializeStore = (preloadedState: any) => {
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
