import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkLogin} from "./store/user/api-actions";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
store.dispatch(checkLogin());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
