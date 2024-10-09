import type { RootState } from "@store/slices";

const getRouterReducer = (store: RootState) => store.router;

const getRouter = (store: RootState) => getRouterReducer(store).router;

export default getRouter;
