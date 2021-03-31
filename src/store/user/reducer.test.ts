import userReducer, {initialState, setAuthInfo, setAuthorizationStatus} from "./slice";
import {
  MOCK_ADAPTED_AUTH_INFO,
  MOCK_AUTHORIZATION_STATUS,
  MOCK_EMPTY_ACTION,
} from "../../common-mock";

describe(`Offers reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(userReducer(undefined, MOCK_EMPTY_ACTION)).toEqual(initialState);
  });

  it(`Reducer should set authorization status`, () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: MOCK_AUTHORIZATION_STATUS
    };

    expect(userReducer(initialState, setAuthorizationStatus(MOCK_AUTHORIZATION_STATUS))).toEqual(expectedState);
  });

  it(`Reducer should set set auth info`, () => {
    const expectedState = {
      ...initialState,
      authInfo: MOCK_ADAPTED_AUTH_INFO
    };

    expect(userReducer(initialState, setAuthInfo(MOCK_ADAPTED_AUTH_INFO))).toEqual(expectedState);
  });
});
