import React, {ReactElement} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Routes from "../../routes";
import PropTypes from "prop-types";
import MainPage from "../mainPage";
import Login from "../login";
import FavoritesPage from "../favoritesPage";
import OfferPage from "../offerPage";
import NotFoundPage from "../notFoundPage";
import Offer from "../../models/offer";

interface AppProps {
  offers: Offer[],
}

const App = ({offers}: AppProps): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.MAIN} exact>
          <MainPage offers={offers} />
        </Route>
        <Route path={Routes.LOGIN} exact>
          <Login />
        </Route>
        <Route path={Routes.FAVORITES} exact>
          <FavoritesPage offers={offers}/>
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
