import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {addToCart} from "../action/cart";
import Product from "../component/product";
import Cart from "./cart";

const products = require("../data/products.json");

@connect(null, {addToCart})
export default class Menu extends Component {

  static propTypes = {
    addToCart: PropTypes.func.isRequired,
    products: PropTypes.array
  };

  static defaultProps = {
    products
  };

  addToCart = product => () => {
    this.props.addToCart(product);
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {this.props.products.map(product => (
              <div className="col-md-4" key={product.id}>
                <Product product={product} addToCart={this.addToCart} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-3 offset-md-1">
          <div className="row">
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}
