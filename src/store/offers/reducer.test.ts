import offersReducer, {initialState, setIsLoading, setOffers, setSortType} from "./offers";
import {MOCK_EMPTY_ACTION, MOCK_ADAPTED_OFFERS, MOCK_SORT_TYPE} from "../../common-mock";

describe(`Offers reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(offersReducer(undefined, MOCK_EMPTY_ACTION)).toEqual(initialState);
  });

  it(`Reducer should set offers`, () => {
    const expectedState = {
      ...initialState,
      offers: MOCK_ADAPTED_OFFERS
    };

    expect(offersReducer(initialState, setOffers(MOCK_ADAPTED_OFFERS))).toEqual(expectedState);
  });

  it(`Reducer should set set sorttype`, () => {
    const expectedState = {
      ...initialState,
      sortType: MOCK_SORT_TYPE
    };

    expect(offersReducer(initialState, setSortType(MOCK_SORT_TYPE))).toEqual(expectedState);
  });

  it(`Reducer should set is loading`, () => {
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(offersReducer(initialState, setIsLoading(true))).toEqual(expectedState);
  });
});
