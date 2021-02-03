import React from 'react';
import MainPage from "../main-page/main-page";
import {MOCK_PLACES} from "../../data";

const App = () => {
  return (
    <MainPage places={MOCK_PLACES} />
  );
};

export default App;
