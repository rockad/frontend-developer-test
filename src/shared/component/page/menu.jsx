// @flow

import React from "react";
import injectSheet from "react-jss";
import Menu from "../menu";

const styles = {
  hoverMe: {
    "&:hover": {
      color: "red",
    },
  },
  "@media (max-width: 800px)": {
    resizeMe: {
      color: "red",
    },
  },
  specialButton: {
    composes: ["btn", "btn-primary"],
    backgroundColor: "limegreen",
  },
};

const HomePage = ({classes}: { classes: Object }) =>
  <div className="container">
    <div className="row mt-4 mb-3">
      <div className="col-md-12">
        <h1>Меню</h1>
      </div>
    </div>
    <Menu />
  </div>;

export default injectSheet(styles)(HomePage);