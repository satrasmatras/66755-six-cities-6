import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {checkLogin} from "./store/user/user";
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

// TODO: при открытии любой страницы если пользователь не авторизован сначала всегда перенаправляет на страницу логина
// todo: если отправить несколько отзывов подряд возможна такая ситуация https://prnt.sc/114yk66 или вообще такая https://prnt.sc/114yl6a, при этом если нажать на кнопку отзыв оставляется такой же как и предыдущий
