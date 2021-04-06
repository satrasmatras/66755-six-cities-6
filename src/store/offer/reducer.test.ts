import offerReducer, {
  initialState,
  setComments,
  setCommentsAreLoading, setCommentsError,
  setNearbyOffers, setNearbyOffersAreLoading,
  setOffer,
  setOfferIsLoading, updateNearbyOffer
} from "./offer";
import {
  MOCK_ADAPTED_COMMENTS,
  MOCK_EMPTY_ACTION,
  MOCK_ADAPTED_OFFER,
  MOCK_ADAPTED_OFFERS,
  MOCK_ERROR_MESSAGE
} from "../../common-mock";
import {updateItem} from "../../services/items";

describe(`Offer reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(offerReducer(undefined, MOCK_EMPTY_ACTION)).toEqual(initialState);
  });

  it(`Reducer should set offer`, () => {
    const expectedState = {
      ...initialState,
      offer: MOCK_ADAPTED_OFFER
    };

    expect(offerReducer(initialState, setOffer(MOCK_ADAPTED_OFFER))).toEqual(expectedState);
  });

  it(`Reducer should offer is loading`, () => {
    const expectedState = {
      ...initialState,
      offerIsLoading: true
    };

    expect(offerReducer(initialState, setOfferIsLoading(true))).toEqual(expectedState);
  });

  it(`Reducer should set comments`, () => {
    const expectedState = {
      ...initialState,
      comments: MOCK_ADAPTED_COMMENTS
    };

    expect(offerReducer(initialState, setComments(MOCK_ADAPTED_COMMENTS))).toEqual(expectedState);
  });

  it(`Reducer should set comments are loading`, () => {
    const expectedState = {
      ...initialState,
      commentsAreLoading: true
    };

    expect(offerReducer(initialState, setCommentsAreLoading(true))).toEqual(expectedState);
  });

  it(`Reducer should set nearby`, () => {
    const expectedState = {
      ...initialState,
      nearbyOffers: MOCK_ADAPTED_OFFERS
    };

    expect(offerReducer(initialState, setNearbyOffers(MOCK_ADAPTED_OFFERS))).toEqual(expectedState);
  });
  it(`Reducer should set nearby are loading`, () => {
    const expectedState = {
      ...initialState,
      nearbyOffersIsLoading: true
    };

    expect(offerReducer(initialState, setNearbyOffersAreLoading(true))).toEqual(expectedState);
  });
  it(`Reducer should update nearby offer`, () => {
    const state = {
      ...initialState,
      nearbyOffers: MOCK_ADAPTED_OFFERS
    };

    const expectedState = {
      ...state,
      nearbyOffers: updateItem(MOCK_ADAPTED_OFFERS, MOCK_ADAPTED_OFFER),
    };

    expect(offerReducer(state, updateNearbyOffer(MOCK_ADAPTED_OFFER))).toEqual(expectedState);
  });
  it(`Reducer should setCommentsError`, () => {

    const expectedState = {
      ...initialState,
      commentsError: MOCK_ERROR_MESSAGE
    };

    expect(offerReducer(initialState, setCommentsError(MOCK_ERROR_MESSAGE))).toEqual(expectedState);
  });
});
