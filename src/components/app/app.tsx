import * as React from 'react';
import MainPage from "../main-page/main-page";
import Login from "../login/login";
import {ReactElement} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {FAVORITES_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, OFFER_ROUTE} from "../../routes";
import Favorites from "../favorites/favorites";
import PlacePage from "../place-page/place-page";

const PLACES_COUNT = 5;

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={MAIN_ROUTE} exact>
          <MainPage placesCount={PLACES_COUNT}/>
        </Route>
        <Route path={LOGIN_ROUTE} exact>
          <Login />
        </Route>
        <Route path={FAVORITES_ROUTE} exact>
          <Favorites />
        </Route>
        <Route path={OFFER_ROUTE} exact>
          <PlacePage />
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
