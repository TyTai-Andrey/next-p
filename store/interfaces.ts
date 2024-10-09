// redux
import { AnyAction, SagaMiddleware } from "redux-saga";
import { CombinedState } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

// local imports
// store
import { RootState } from "@store/slices";

type MyStore = ToolkitStore<CombinedState<RootState>, AnyAction, SagaMiddleware<object>[]>

export default MyStore;
