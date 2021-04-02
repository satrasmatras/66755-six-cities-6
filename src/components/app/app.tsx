import React, {ReactElement} from 'react';
import {Switch, Route} from "react-router-dom";
import Routes from "../../routes";
import MainPage from "../main-page";
import Login from "../login";
import FavoritesPage from "../favorites-page";
import OfferPage from "../offer-page";
import NotFoundPage from "../not-found-page";
import PrivateRoute from "../private-route";

const App = (): ReactElement => {
  return (
    <Switch>
      <Route exact path={Routes.MAIN}>
        <MainPage />
      </Route>
      <Route exact path={Routes.LOGIN}>
        <Login />
      </Route>
      <PrivateRoute
        path={Routes.FAVORITES}
        exact
        render={() => <FavoritesPage />}
      />
      <Route exact path={Routes.OFFER}>
        <OfferPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default App;
