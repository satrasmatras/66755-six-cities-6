export const SET_AUTHORIZATION_STATUS = `user/setAuthorizationStatus`;

export enum AuthorizationStatus {
  NO_AUTH = `NO_AUTH`,
  AUTH = `AUTH`
}

export interface UserState {
  authorizationStatus: AuthorizationStatus,
}

export interface SetAuthorizationState {
  type: typeof SET_AUTHORIZATION_STATUS,
  payload: AuthorizationStatus
}

export type UserActionTypes = SetAuthorizationState;
