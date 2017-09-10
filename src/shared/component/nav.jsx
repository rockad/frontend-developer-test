// @flow

import $ from "jquery";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import {APP_NAME} from "../config";
import {ORDER_PAGE_ROUTE, MENU_PAGE_ROUTE,} from "../routes";

const handleNavLinkClick = () => {
  $("body").scrollTop(0);
  $(".js-navbar-collapse").collapse("hide");
};

const Nav = () =>
  <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
    <button className="navbar-toggler navbar-toggler-right" type="button" role="button" data-toggle="collapse" data-target=".js-navbar-collapse">
      <span className="navbar-toggler-icon" />
    </button>
    <Link to={MENU_PAGE_ROUTE} className="navbar-brand">{APP_NAME}</Link>
  </nav>;

export default Nav;
