// Core
import { createAction } from "@reduxjs/toolkit";

// Types
import RouterTypes from "@store/slices/router/types";

const RouterActions = { changeRouter: createAction(RouterTypes.CHANGE_ROUTER, (data: string) => ({ payload: data })) };

export default RouterActions;
