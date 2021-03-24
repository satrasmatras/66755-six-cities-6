import {createSlice} from "@reduxjs/toolkit";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {RootState} from "../index";
import {AxiosInstance} from "axios";
import Routes from "../../routes";
import { redirectToRoute } from "../redirect/slice";

export enum AuthorizationStatus {
  NO_AUTH = `NO_AUTH`,
  AUTH = `AUTH`
}

export interface UserState {
  authorizationStatus: AuthorizationStatus,
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const userSlice = createSlice({
  name: `user`,
  initialState: initialState,
  reducers: {
    setAuthorizationStatus: (state, action) => {
      state.authorizationStatus = action.payload;
    }
  }
});

export const {
  setAuthorizationStatus,
} = userSlice.actions;

enum ApiRoutes {
  LOGIN = `login`,
}

export const checkLogin = () => (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): void => {
  api.get(ApiRoutes.LOGIN)
    .then(() => {
      next(setAuthorizationStatus(AuthorizationStatus.AUTH));
    });
};

export interface LoginPayload {
  email: string,
  password: string
}

export const login = (
  {email, password}: LoginPayload
) => (next: ThunkDispatch<undefined, undefined, Action>, _: RootState, api: AxiosInstance): void => {
  api.post(ApiRoutes.LOGIN, {
    email,
    password
  })
    .then(() => {
      next(setAuthorizationStatus(AuthorizationStatus.AUTH));
      next(redirectToRoute(Routes.MAIN));
    });
};

export default userSlice.reducer;
