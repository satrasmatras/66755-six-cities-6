import React, {ReactElement} from 'react';
import {Router as BrowserRouter, Switch, Route} from "react-router-dom";
import Routes from "../../routes";
import PropTypes from "prop-types";
import MainPage from "../main-page";
import Login from "../login";
import FavoritesPage from "../favorites-page";
import OfferPage from "../offer-page";
import NotFoundPage from "../not-found-page";
import PrivateRoute from "../private-route";

const App = (): ReactElement => {
  return (
    <Switch>
      <Route path={Routes.MAIN} exact>
        <MainPage />
      </Route>
      <Route path={Routes.LOGIN} exact>
        <Login />
      </Route>
      <PrivateRoute
        path={Routes.FAVORITES}
        exact
        render={() => <FavoritesPage />}
      />
      <Route path={Routes.OFFER} exact>
        <OfferPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

App.propTypes = {
  offers: PropTypes.array,
};

export default App;
