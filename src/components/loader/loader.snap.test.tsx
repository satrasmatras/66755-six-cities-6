import React from "react";
import {render} from "@testing-library/react";
import Loader from "./loader";

it(`Should favorites list render correctly`, () => {
  const {container} = render(<Loader />);
  expect(container).toMatchSnapshot();
});
