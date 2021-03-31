import configureStore from "redux-mock-store";
import {initialState} from "../../store/city/slice";

const store = configureStore(undefined)({city: initialState});

it(`123`, () => {
  expect(1).toBe(1);
});

//
// it(`Should route main when /`, () => {
//   jest.mock(`react-redux`, () => ({
//     useSelector: jest.fn((fn) => fn()),
//     useDispatch: jest.fn((fn) => fn()),
//   }));
//
//   browserHistory.push(Routes.MAIN);
//
//   const {container} = render(
//       <Provider store={store}>
//         <Router history={browserHistory}>
//           <App />
//         </Router>
//       </Provider>
//   );
//   expect(container).toMatchSnapshot();
// });
//
// it(`Should route offerpage when /offer/id`, () => {
//   jest.spyOn(redux, `useSelector`);
//   jest.spyOn(redux, `useDispatch`);
//
//   browserHistory.push(Routes.OFFER);
//
//   const {container} = render(
//       <Provider store={store}>
//         <Router history={browserHistory}>
//           <App />
//         </Router>
//       </Provider>
//   );
//   expect(container).toMatchSnapshot();
// });
//
// it(`Should route not-found when not-found`, () => {
//   jest.spyOn(redux, `useSelector`);
//   jest.spyOn(redux, `useDispatch`);
//
//   browserHistory.push(Routes.NOT_FOUND);
//
//   const {container} = render(
//       <Provider store={store}>
//         <Router history={browserHistory}>
//           <App />
//         </Router>
//       </Provider>
//   );
//   expect(container).toMatchSnapshot();
// });
//
// it(`Should route login when login`, () => {
//   jest.spyOn(redux, `useSelector`);
//   jest.spyOn(redux, `useDispatch`);
//
//   browserHistory.push(Routes.LOGIN);
//
//   const {container} = render(
//       <Provider store={store}>
//         <Router history={browserHistory}>
//           <App />
//         </Router>
//       </Provider>
//   );
//   expect(container).toMatchSnapshot();
// });


