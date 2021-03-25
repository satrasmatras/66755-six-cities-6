import browserHistory from "../../services/browser-history";
import {Dispatch, Store} from "redux";
import {createSlice} from "@reduxjs/toolkit";

const redirectSlice = createSlice({
  name: `redirect`,
  initialState: {},
  reducers: {
    redirectToRoute: (state, action) => null,
  }
});

export const {
  redirectToRoute,
} = redirectSlice.actions;

export const redirectMiddleware = (_store: Store) => (next: Dispatch) => (action: any) => {
  if (action.type === redirectToRoute.type) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
export default redirectSlice.reducer;
