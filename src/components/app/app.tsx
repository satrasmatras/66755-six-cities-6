import * as React from 'react';
import MainPage from "../main-page/main-page";

const PLACES_COUNT = 5;

const App = () => {
  return (
    <MainPage placesCount={PLACES_COUNT}/>
  );
};

export default App;
