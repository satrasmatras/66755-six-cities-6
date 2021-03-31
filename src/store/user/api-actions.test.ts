import {createAPI} from "../../services/api";
import MockAdapter from "axios-mock-adapter";
import {MOCK_ADAPTED_AUTH_INFO, MOCK_AUTH_INFO_FROM_API, MOCK_LOGIN_PAYLOAD} from "../../common-mock";
import {
  ApiRoutes,
  AuthorizationStatus,
  checkLogin, login, logout,
  SET_AUTH_INFO,
  SET_AUTHORIZATION_STATUS,

} from "./slice";
import {REDIRECT_TO_ROUTE} from "../redirect/slice";
import Routes from "../../routes";
const api = createAPI(undefined, undefined);

describe(`user async actions work correctly`, () => {
  it(`should checklogin correctly`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const checkLoginLoader = checkLogin();

    apiMock
      .onGet(ApiRoutes.LOGIN)
      .reply(200, MOCK_AUTH_INFO_FROM_API);

    return checkLoginLoader(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTH
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_AUTH_INFO,
          payload: MOCK_ADAPTED_AUTH_INFO
        });
      });
  });
  it(`should login correctly`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const loginLoader = login(MOCK_LOGIN_PAYLOAD);

    apiMock
      .onPost(ApiRoutes.LOGIN)
      .reply(200, MOCK_AUTH_INFO_FROM_API);

    return loginLoader(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTH
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_AUTH_INFO,
          payload: MOCK_ADAPTED_AUTH_INFO
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: REDIRECT_TO_ROUTE,
          payload: Routes.MAIN
        });
      });
  });
  it(`should login correctly`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const logoutLoader = logout();

    apiMock
      .onGet(ApiRoutes.LOGOUT)
      .reply(200);

    return logoutLoader(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.NO_AUTH
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_AUTH_INFO,
          payload: null
        });
      });
  });
});
