import {RootState} from "../store/store";
import {createSelector} from "reselect";
import {AuthorizationStatus} from "../store/user/user";

const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;

export const selectIsAuthorized = createSelector(
    selectAuthorizationStatus,
    (status) => status === AuthorizationStatus.AUTH
);

export const selectIsUnknownAuthorized = createSelector(
    selectAuthorizationStatus,
    (status) => status === AuthorizationStatus.UNKNOWN
);
