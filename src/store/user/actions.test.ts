import {MOCK_ADAPTED_AUTH_INFO, MOCK_AUTHORIZATION_STATUS, MOCK_ERROR_MESSAGE} from "../../common-mock";
import {
  SET_AUTH_INFO,
  SET_AUTHORIZATION_STATUS,
  SET_LOGIN_ERROR,
  setAuthInfo,
  setAuthorizationStatus,
  setLoginError
} from "./user";

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
        setAuthInfo(MOCK_ADAPTED_AUTH_INFO)
    ).toStrictEqual(
        {
          type: SET_AUTH_INFO,
          payload: MOCK_ADAPTED_AUTH_INFO
        }
    );
  });

  it(`setLoginError is correct`, () => {
    expect(
        setLoginError(MOCK_ERROR_MESSAGE)
    ).toStrictEqual(
        {
          type: SET_LOGIN_ERROR,
          payload: MOCK_ERROR_MESSAGE
        }
    );
  });
});
