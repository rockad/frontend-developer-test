// @flow

import {cartPage, homePage} from "./controller";

import {MENU_PAGE_ROUTE, ORDER_PAGE_ROUTE} from "../shared/routes";

import renderApp from "./render-app";

export default (app: Object) => {
  app.get(MENU_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, homePage()));
  });

  app.get(ORDER_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, cartPage()));
  });

  app.get("/500", () => {
    throw Error("Fake Internal Server Error");
  });

  app.get("*", (req, res) => {
    res.status(404).send(renderApp(req.url));
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });
};
