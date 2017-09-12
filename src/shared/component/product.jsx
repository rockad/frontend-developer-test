// @flow
import React from "react";

const Product = (props: Object) =>
  <div className="card mb-3">
    <img className="card-img-top" src={props.product.img} alt={props.product.name} />
    <div className="card-block">
      <h4 className="card-title">{props.product.name}</h4>
      <p className="card-text">{props.product.desc}</p>
      <button
        type="button"
        className="btn btn-success float-right"
        style={{
          cursor: "pointer"
        }}
        onClick={props.addToCart(props.product)}
      >{props.product.price}&nbsp;₽
      </button>
    </div>
  </div>;

export default Product;
