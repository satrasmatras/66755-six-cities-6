import offerReducer, {changeCity, initialState} from './city';
import {MOCK_CITY, MOCK_EMPTY_ACTION} from "../../common-mock";

describe(`City reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(offerReducer(undefined, MOCK_EMPTY_ACTION)).toEqual(initialState);
  });

  it(`Reducer should change city`, () => {
    const expectedState = {
      ...initialState,
      city: MOCK_CITY
    };

    expect(offerReducer(initialState, changeCity(MOCK_CITY))).toEqual(expectedState);
  });
});
