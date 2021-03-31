import browserHistory from "../../services/browser-history";
import {Dispatch, Store} from "redux";
import {createAction} from "@reduxjs/toolkit";

export const REDIRECT_TO_ROUTE = `reducer/redirectToRoute`;
export const redirectToRoute = createAction<string>(REDIRECT_TO_ROUTE);

export const redirectMiddleware = (_store: Store) => (next: Dispatch) => (action: any) => {
  if (action.type === redirectToRoute.type) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
