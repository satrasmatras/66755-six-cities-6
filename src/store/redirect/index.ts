import browserHistory from "../../services/browser-history";
import {Dispatch, Store} from "redux";
import {REDIRECT_TO_ROUTE} from "./types";

export const redirect = (_store: Store) => (next: Dispatch) => (action: any) => {
  if (action.type === REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
