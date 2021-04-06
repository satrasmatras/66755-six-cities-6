import {redirectMiddleware, redirectToRoute} from "./redirect";
import {createMemoryHistory} from "history";
import Routes from "../../routes";

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  };

  const next = jest.fn();

  const history = createMemoryHistory();
  const invoke = (action: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return redirectMiddleware(history)(store)(next)(action);
  };

  return {store, next, invoke, history};
};

describe(`Custom middleware works correctly`, () => {
  it(`Action passes to next middleware`, () => {
    const {invoke, next} = create();
    const action = redirectToRoute(Routes.MAIN);
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it(`Redirect route should be added to fakeHistory`, () => {
    const {invoke, history} = create();
    invoke(redirectToRoute(Routes.LOGIN));
    expect(history.location.pathname).toBe(Routes.LOGIN);

    invoke(redirectToRoute(Routes.NOT_FOUND));
    expect(history.location.pathname).toBe(Routes.NOT_FOUND);
  });

  it(`Non redirect because bad action`, () => {
    const url = `/test-url`;
    const {invoke, history} = create();
    invoke({type: `TEST_ACTION`, payload: url});
    expect(history.location.pathname).not.toBe(url);
  });
});
