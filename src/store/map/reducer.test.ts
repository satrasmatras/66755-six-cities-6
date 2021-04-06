import mapReducer, {initialState, updateHoveredOffer} from "./map";
import {MOCK_EMPTY_ACTION, MOCK_ADAPTED_OFFER} from "../../common-mock";

describe(`Map reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(mapReducer(undefined, MOCK_EMPTY_ACTION)).toEqual(initialState);
  });

  it(`Reducer should set hovered offer`, () => {
    const expectedState = {
      ...initialState,
      hoveredOffer: MOCK_ADAPTED_OFFER
    };

    expect(mapReducer(initialState, updateHoveredOffer(MOCK_ADAPTED_OFFER))).toEqual(expectedState);
  });
});
