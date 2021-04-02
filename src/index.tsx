import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkLogin} from "./store/user/slice";
import {Router} from "react-router-dom";
import browserHistory from "./browser-history";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
store.dispatch(checkLogin());

ReactDOM.render(
    <Router history={browserHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.querySelector(`#root`)
);
