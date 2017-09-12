// @flow

import $ from "jquery";
import React from "react";
import {Link} from "react-router-dom";
import {APP_NAME} from "../config";
import {MENU_PAGE_ROUTE} from "../routes";

const handleNavLinkClick = () => {
  $("body").scrollTop(0);
};

const Nav = () =>
  <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
    <button className="navbar-toggler navbar-toggler-right" type="button" role="button" data-toggle="collapse" data-target=".js-navbar-collapse">
      <span className="navbar-toggler-icon" />
    </button>
    <Link to={MENU_PAGE_ROUTE} className="navbar-brand" onClick={handleNavLinkClick}>{APP_NAME}</Link>
  </nav>;

export default Nav;
