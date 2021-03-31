import favoritesReducer, {
  initialState,
  setFavorites,
  setIsLoading,
  deleteFavorite
} from './slice';
import {MOCK_EMPTY_ACTION, MOCK_ADAPTED_OFFER, MOCK_ADAPTED_OFFERS} from "../../common-mock";
import {deleteItem} from "../../services/items";

describe(`City reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(favoritesReducer(undefined, MOCK_EMPTY_ACTION)).toEqual(initialState);
  });

  it(`Reducer should set favorites`, () => {
    const expectedState = {
      ...initialState,
      favorites: MOCK_ADAPTED_OFFERS
    };

    expect(favoritesReducer(initialState, setFavorites(MOCK_ADAPTED_OFFERS))).toEqual(expectedState);
  });

  it(`Reducer should delete favorite`, () => {
    const state = {
      ...initialState,
      favorites: MOCK_ADAPTED_OFFERS
    };

    const expectedState = {
      ...initialState,
      favorites: deleteItem(MOCK_ADAPTED_OFFERS, MOCK_ADAPTED_OFFER)
    };

    expect(favoritesReducer(state, deleteFavorite(MOCK_ADAPTED_OFFER))).toEqual(expectedState);
  });

  it(`Reducer should set loading`, () => {
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(favoritesReducer(initialState, setIsLoading(true))).toEqual(expectedState);
  });
});
