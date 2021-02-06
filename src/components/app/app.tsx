import React, {ReactElement} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Routes from "../../routes";
import MainPage from "../main-page";
import Login from "../login";
import Favorites from "../favorites";
import PlacePage from "../place-page";
import NotFoundPage from "../not-found-page";

const PLACES_COUNT = 5;

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.MAIN} exact>
          <MainPage placesCount={PLACES_COUNT}/>
        </Route>
        <Route path={Routes.LOGIN} exact>
          <Login />
        </Route>
        <Route path={Routes.FAVORITES} exact>
          <Favorites />
        </Route>
        <Route path={Routes.OFFER} exact>
          <PlacePage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
