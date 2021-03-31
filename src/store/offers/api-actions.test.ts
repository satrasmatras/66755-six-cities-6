import {createAPI} from "../../services/api";
import MockAdapter from "axios-mock-adapter";
import {MOCK_ADAPTED_OFFERS, MOCK_OFFERS_FROM_API} from "../../common-mock";
import {ApiRoutes, fetchOffers, SET_IS_LOADING, SET_OFFERS} from "./slice";
const api = createAPI(undefined, undefined);

describe(`offer async actions work correctly`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  it(`should fetch offers correctly`, () => {
    const fetchOffersLoader = fetchOffers();

    apiMock
      .onGet(ApiRoutes.FETCH_OFFERS)
      .reply(200, MOCK_OFFERS_FROM_API);

    return fetchOffersLoader(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_IS_LOADING,
          payload: true
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_OFFERS,
          payload: MOCK_ADAPTED_OFFERS
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_IS_LOADING,
          payload: false
        });
      });
  });
});
