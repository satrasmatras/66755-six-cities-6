import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../services/api";
import {
  ApiRoutes, DELETE_FAVORITE,
  fetchFavorites,
  getFavoriteToggle,
  SET_FAVORITES,
  SET_IS_LOADING,
  toggleFavorite,
  ToggleFavoriteTarget
} from "./slice";
import {
  MOCK_ADAPTED_OFFER,
  MOCK_ADAPTED_OFFERS,
  MOCK_OFFER_FROM_API,
  MOCK_OFFERS_FROM_API
} from "../../common-mock";
import {UPDATE_OFFER} from "../offers/slice";
import {adaptDataToOffer} from "../../adapters/offers";
import {SET_OFFER} from "../offer/slice";

const api = createAPI(undefined, undefined);

describe(`async actions work correctly`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  it(`should make correct fetch favorite offers`, () => {
    const fetchFavoritesLoader = fetchFavorites();

    apiMock
      .onGet(ApiRoutes.FAVORITES)
      .reply(200, MOCK_OFFERS_FROM_API);

    return fetchFavoritesLoader(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_IS_LOADING,
          payload: true
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_FAVORITES,
          payload: MOCK_ADAPTED_OFFERS
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_IS_LOADING,
          payload: false
        });
      });
  });

  it(`should correct toggle favorite for main`, () => {
    const {id} = MOCK_ADAPTED_OFFER;
    const expectedIsFavorite = Number(!MOCK_ADAPTED_OFFER.isFavorite);
    const toggleFavoriteUrl = getFavoriteToggle(id, expectedIsFavorite);

    const toggleFavoriteToMain = toggleFavorite(MOCK_ADAPTED_OFFER, ToggleFavoriteTarget.MAIN);

    const expectedOfferFromApi = {
      ...MOCK_OFFER_FROM_API,
      [`is_favorite`]: expectedIsFavorite
    };

    const expectedPayload = adaptDataToOffer(expectedOfferFromApi);

    apiMock
      .onPost(toggleFavoriteUrl)
      .reply(200, expectedOfferFromApi);

    return toggleFavoriteToMain(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: UPDATE_OFFER,
          payload: expectedPayload
        });
      });
  });

  it(`should correct toggle favorite for favorites`, () => {
    const {id} = MOCK_ADAPTED_OFFER;
    const expectedIsFavorite = Number(!MOCK_ADAPTED_OFFER.isFavorite);
    const toggleFavoriteUrl = getFavoriteToggle(id, expectedIsFavorite);

    const toggleFavoriteToMain = toggleFavorite(MOCK_ADAPTED_OFFER, ToggleFavoriteTarget.FAVORITES);

    const expectedOfferFromApi = {
      ...MOCK_OFFER_FROM_API,
      [`is_favorite`]: expectedIsFavorite
    };

    const expectedPayload = adaptDataToOffer(expectedOfferFromApi);

    apiMock
      .onPost(toggleFavoriteUrl)
      .reply(200, expectedOfferFromApi);

    return toggleFavoriteToMain(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: DELETE_FAVORITE,
          payload: expectedPayload
        });
      });
  });

  it(`should correct toggle favorite for offer`, () => {
    const {id} = MOCK_ADAPTED_OFFER;
    const expectedIsFavorite = Number(!MOCK_ADAPTED_OFFER.isFavorite);
    const toggleFavoriteUrl = getFavoriteToggle(id, expectedIsFavorite);

    const toggleFavoriteToMain = toggleFavorite(MOCK_ADAPTED_OFFER, ToggleFavoriteTarget.OFFER);

    const expectedOfferFromApi = {
      ...MOCK_OFFER_FROM_API,
      [`is_favorite`]: expectedIsFavorite
    };

    const expectedPayload = adaptDataToOffer(expectedOfferFromApi);

    apiMock
      .onPost(toggleFavoriteUrl)
      .reply(200, expectedOfferFromApi);

    return toggleFavoriteToMain(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: SET_OFFER,
          payload: expectedPayload
        });
      });
  });
});
