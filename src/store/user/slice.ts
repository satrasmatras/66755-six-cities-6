import {createAction, createReducer} from "@reduxjs/toolkit";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {RootState} from "../index";
import {AxiosInstance} from "axios";
import Routes from "../../routes";
import {redirectToRoute} from "../redirect/slice";
import AuthInfo from "../../models/auth-info";
import {adaptDataToAuthInfo} from "../../adapters/auth-info";

export enum AuthorizationStatus {
  NO_AUTH = `NO_AUTH`,
  AUTH = `AUTH`,
  UNKNOWN = `UNKNOWN`,
}

export interface UserState {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo
}

export const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  authInfo: null,
};

export const SET_AUTHORIZATION_STATUS = `user/setAuthorizationStatus`;
export const setAuthorizationStatus = createAction<AuthorizationStatus>(SET_AUTHORIZATION_STATUS);

export const SET_AUTH_INFO = `user/setAuthInfo`;
export const setAuthInfo = createAction<AuthInfo>(SET_AUTH_INFO);

const userReducer = createReducer(
    initialState,
    (builder) => {
      builder.addCase(setAuthorizationStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      });
      builder.addCase(setAuthInfo, (state, action) => {
        state.authInfo = action.payload;
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
  const response = await api.post(ApiRoutes.LOGIN, {
    email,
    password
  });

  next(setAuthorizationStatus(AuthorizationStatus.AUTH));
  next(setAuthInfo(adaptDataToAuthInfo(response.data)));
  next(redirectToRoute(Routes.MAIN));
};

export const logout = () => async (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): Promise<void> => {
  await api.get(ApiRoutes.LOGOUT);

  next(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
  next(setAuthInfo(null));
};

export default userReducer;
