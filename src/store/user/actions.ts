import {Action, ActionCreator} from "redux";
import {AuthorizationStatus, SET_AUTHORIZATION_STATUS, UserActionTypes} from "./types";

export const setAuthorizationStatus: ActionCreator<Action> = (authorizationStatus: AuthorizationStatus): UserActionTypes => {
  return {
    type: SET_AUTHORIZATION_STATUS,
    payload: authorizationStatus
  };
};
