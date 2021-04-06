import {createAction, createReducer} from "@reduxjs/toolkit";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {RootState} from "../store";
import {AxiosInstance} from "axios";
import Routes from "../../routes";
import {redirectToRoute} from "../redirect/redirect";
import AuthInfo from "../../models/auth-info";
import {adaptDataToAuthInfo} from "../../adapters/auth-info";
import {SHOW_ERROR_TIME} from "../../constants";

export enum AuthorizationStatus {
  NO_AUTH = `NO_AUTH`,
  AUTH = `AUTH`,
  UNKNOWN = `UNKNOWN`,
}

export interface UserState {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo,
  loginError: string,
}

export const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  authInfo: null,
  loginError: ``,
};

export const selectLoginError = (state: RootState) => state.user.loginError;

export const SET_AUTHORIZATION_STATUS = `user/setAuthorizationStatus`;
export const setAuthorizationStatus = createAction<AuthorizationStatus>(SET_AUTHORIZATION_STATUS);

export const SET_AUTH_INFO = `user/setAuthInfo`;
export const setAuthInfo = createAction<AuthInfo>(SET_AUTH_INFO);

export const SET_LOGIN_ERROR = `user/setLoginError`;
export const setLoginError = createAction<string>(SET_LOGIN_ERROR);

const userReducer = createReducer(
    initialState,
    (builder) => {
      builder.addCase(setAuthorizationStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      });
      builder.addCase(setAuthInfo, (state, action) => {
        state.authInfo = action.payload;
      });
      builder.addCase(setLoginError, (state, action) => {
        state.loginError = action.payload;
      });
    }
);

export enum ApiRoutes {
  LOGIN = `login`,
  LOGOUT = `logout`,
}

export const checkLogin = () => async (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): Promise<void> => {
  const response = await api.get(ApiRoutes.LOGIN);
  next(setAuthorizationStatus(AuthorizationStatus.AUTH));
  next(setAuthInfo(adaptDataToAuthInfo(response.data)));
};

export interface LoginPayload {
  email: string,
  password: string
}

export const login = (
    {email, password}: LoginPayload
) => async (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): Promise<void> => {
  try {

    const response = await api.post(ApiRoutes.LOGIN, {
      email,
      password
    });

    next(setAuthorizationStatus(AuthorizationStatus.AUTH));
    next(setAuthInfo(adaptDataToAuthInfo(response.data)));
    next(redirectToRoute(Routes.MAIN));
  } catch (err) {
    next(setLoginError(err.message));
    setTimeout(() => {
      next(setLoginError(``));
    }, SHOW_ERROR_TIME);
  }
};

export const logout = () => async (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): Promise<void> => {
  await api.get(ApiRoutes.LOGOUT);

  next(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
  next(setAuthInfo(null));
};

export default userReducer;
