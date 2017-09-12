import React from "react";
import renderer from "react-test-renderer";

import Menu from "./menu";

test("Menu is rendering", () => {
  const component = renderer.create(<Menu store={{getState: () => ({})}} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
