import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkLogin} from "./store/user/slice";
import {Router as BrowserRouter} from "react-router";
import browserHistory from "./services/browser-history";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
store.dispatch(checkLogin());

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(`#root`)
);
