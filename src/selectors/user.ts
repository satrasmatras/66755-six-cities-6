import {RootState} from "../store";
import {createSelector} from "reselect";
import {AuthorizationStatus} from "../store/user/slice";

const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;

export const selectIsAuthorized = createSelector(
  selectAuthorizationStatus,
  (status) => status === AuthorizationStatus.AUTH
);
