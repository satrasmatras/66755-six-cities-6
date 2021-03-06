import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import OFFERS from './mocks/offers';
import {Provider} from 'react-redux';
import {store} from './store';

ReactDOM.render(
    <Provider store={store}>
      <App offers={OFFERS} />
    </Provider>,
    document.querySelector(`#root`)
);
