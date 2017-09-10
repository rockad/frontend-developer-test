// @flow

import React from "react";
import {Switch} from "react-router";
import {Route} from "react-router-dom";
import Helmet from "react-helmet";

import HomePage from "./component/page/menu";
import OrderPage from "./component/page/order";

import Footer from "./component/footer";
import Nav from "./component/nav";
import NotFoundPage from "./component/page/not-found";
import {APP_NAME} from "./config";
import {ORDER_PAGE_ROUTE, MENU_PAGE_ROUTE,} from "./routes";

const App = () =>
  (<div style={{paddingTop: 54}}>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Nav />
    <Switch>
      <Route exact path={MENU_PAGE_ROUTE} component={HomePage} />
      <Route path={ORDER_PAGE_ROUTE} component={OrderPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>);

export default App;
