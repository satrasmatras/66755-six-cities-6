import {AuthorizationStatus, SET_AUTHORIZATION_STATUS, UserActionTypes, UserState} from "./types";

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

export const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_AUTHORIZATION_STATUS:
      return {
        ...state,
        authorizationStatus: action.payload
      };

    default:
      return state;
  }
};
