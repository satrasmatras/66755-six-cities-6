import {MOCK_ROUTE} from "../../common-mock";
import {REDIRECT_TO_ROUTE, redirectToRoute} from "./redirect";

describe(`redirect actions test`, () => {
  it(`redirectToRoute is correct`, () => {
    expect(
        redirectToRoute(MOCK_ROUTE)
    ).toStrictEqual(
        {
          type: REDIRECT_TO_ROUTE,
          payload: MOCK_ROUTE
        }
    );
  });
});
