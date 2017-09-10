import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {addToCart} from "../action/cart";
import Cart from "./cart";

const products = require("../data/products.json");

@connect(null, {addToCart})
export default class Menu extends Component {

  static propTypes = {
    addToCart: PropTypes.func.isRequired
  };

  addToCart = product => () => {
    this.props.addToCart(product);
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {products.map(product => (
              <div className="col-md-4" key={product.id}>
                <div className="card mb-3">
                  <img className="card-img-top" src={product.img} alt={product.name} />
                  <div className="card-block">
                    <h4 className="card-title">{product.name}</h4>
                    <p className="card-text">{product.desc}</p>
                    <button
                      type="button"
                      className="btn btn-success float-right"
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={this.addToCart(product)}
                    >{product.price}&nbsp;₽
                    </button>
                  </div>
                </div>
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