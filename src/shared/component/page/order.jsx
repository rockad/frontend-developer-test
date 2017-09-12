import React from "react";
import {CART_MODE_ORDER} from "../../config";
import Cart from "../../container/cart";

const OrderPage = () =>
  <div className="container">
    <div className="row mt-4 mb-3">
      <div className="col-md-12">
        <h1>Оформление заказа</h1>
      </div>
    </div>
    <Cart mode={CART_MODE_ORDER} />
  </div>;

export default OrderPage;
