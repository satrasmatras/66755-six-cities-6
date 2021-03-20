import {AxiosInstance} from "axios";
import {RootState} from "../index";
import {Action} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {setAuthorizationStatus} from "./actions";
import {AuthorizationStatus} from "./types";
import {redirectToRoute} from "../redirect/types";
import Routes from "../../routes";

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
