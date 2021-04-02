import {Dispatch, Store} from "redux";
import {createAction} from "@reduxjs/toolkit";
import {History} from "history";

export const REDIRECT_TO_ROUTE = `reducer/redirectToRoute`;
export const redirectToRoute = createAction<string>(REDIRECT_TO_ROUTE);

export const redirectMiddleware = (history: History) => (_store: Store) => (next: Dispatch) => (action: any) => {
  if (action.type === redirectToRoute.type) {
    history.push(action.payload);
  }

  return next(action);
};
