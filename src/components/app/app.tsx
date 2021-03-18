import React, {ReactElement} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Routes from "../../routes";
import PropTypes from "prop-types";
import MainPage from "../main-page";
import Login from "../login";
import FavoritesPage from "../favorites-page";
import OfferPage from "../offer-page";
import NotFoundPage from "../not-found-page";

const App = (): ReactElement => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.MAIN} exact>
          <MainPage />
        </Route>
        <Route path={Routes.LOGIN} exact>
          <Login />
        </Route>
        <Route path={Routes.FAVORITES} exact>
          <FavoritesPage />
        </Route>
        <Route path={Routes.OFFER} exact>
          <OfferPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.array,
};

export default App;
