import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import OFFERS from './mocks/offers';

ReactDOM.render(
    <App offers={OFFERS} />,
    document.querySelector(`#root`)
);
