import * as React from 'react';
import MainPage from "../main-page/main-page";
import {ReactElement} from "react";

const PLACES_COUNT = 5;

const App = (): ReactElement => {
  return (
    <MainPage placesCount={PLACES_COUNT}/>
  );
};

export default App;
