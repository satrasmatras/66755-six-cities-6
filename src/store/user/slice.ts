import {createSlice} from "@reduxjs/toolkit";
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

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  authInfo: null,
};

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    setAuthInfo: (state, action) => {
      state.authInfo = action.payload;
    }
  }
});

export const {
  setAuthorizationStatus,
  setAuthInfo
} = userSlice.actions;

enum ApiRoutes {
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

export default userSlice.reducer;
