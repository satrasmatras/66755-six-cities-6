import offerReducer, {initialState, setComments, setCommentsAreLoading, setOffer, setOfferIsLoading} from "./slice";
import {MOCK_ADAPTED_COMMENTS, MOCK_EMPTY_ACTION, MOCK_ADAPTED_OFFER} from "../../common-mock";

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
});
