import {MOCK_AUTHORIZATION_STATUS, MOCK_ROUTE} from "../../common-mock";
import {REDIRECT_TO_ROUTE, redirectToRoute} from "../redirect/slice";
import {SET_AUTH_INFO, SET_AUTHORIZATION_STATUS, setAuthInfo, setAuthorizationStatus} from "./slice";

describe(`user actions test`, () => {

  it(`setAuthorizationStatus is correct`, () => {
    expect(
        setAuthorizationStatus(MOCK_AUTHORIZATION_STATUS)
    ).toStrictEqual(
        {
          type: SET_AUTHORIZATION_STATUS,
          payload: MOCK_AUTHORIZATION_STATUS
        }
    );
  });

  it(`setAuthInfo is correct`, () => {
    expect(
        setAuthInfo(MOCK_AUTH_INFO)
    ).toStrictEqual(
        {
          type: SET_AUTH_INFO,
          payload: MOCK_AUTH_INFO
        }
    );
  });
});