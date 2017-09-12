// @flow

import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import map from "lodash/map";
import isEmpty from "lodash/isEmpty";

import {clearCart, loadCart, removeFromCart} from "../action/cart";

import {MENU_PAGE_ROUTE, ORDER_PAGE_ROUTE} from "../routes";
import {CART_MODE_MENU} from "../config";

// flow-disable-next-line
@withRouter
@connect(state => ({
  contents: state.cart.get("contents"),
  isLoading: state.cart.get("isLoading"),
  initialized: state.cart.get("initialized")
}), {clearCart, removeFromCart, loadCart})
export default class Cart extends Component {
  static propTypes = {
    clearCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    loadCart: PropTypes.func.isRequired,
    contents: PropTypes.object.isRequired,
    mode: PropTypes.string,
    history: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    initialized: PropTypes.bool.isRequired
  };

  static defaultProps = {
    mode: CART_MODE_MENU
  };

  componentDidMount() {
    this.props.loadCart();
  }

  clear = () => {
    this.props.clearCart();
  };

  order = () => {
    const {history, mode} = this.props;
    const isInMenu = CART_MODE_MENU === mode;

    if (isInMenu) {
      history.push(ORDER_PAGE_ROUTE);
    } else {
      this.props.clearCart();
      history.push(MENU_PAGE_ROUTE);
    }
  };


  remove = (id: Number) => () => {
    this.props.removeFromCart(id);
  };

  render() {
    const {contents, mode, isLoading, initialized} = this.props;
    let products = {};

    if (contents && !isEmpty(contents.products)) {
      products = contents.products;
    }

    const isInMenu = CART_MODE_MENU === mode;

    return (
      <div className="card">
        <div className="card-header">Корзина</div>
        <div className="card-block">
          {isEmpty(products) ?
           <div className="card-text">
             {
               (initialized && !isLoading) ?
               <span>Ничего не выбрано</span>
                 :
               <div className="progress">
                 <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}} />
               </div>
             }
           </div>
            :
           <table className={`table ${isInMenu ? "table-sm" : ""}`}>
             <thead className="thead-default">
               <tr>
                 <th>Продукт</th>
                 <th>Количество</th>
                 <th colSpan={2}>Стоимость</th>
               </tr>
             </thead>
             <tbody>
               {map(products, product =>
                 <tr key={product.id}>
                   <td>{product.name}</td>
                   <td>{product.qty}</td>
                   <td>{product.total}</td>
                   <td>
                     <button type="button" onClick={this.remove(product.id)} className="btn btn-danger">Удалить</button>
                   </td>
                 </tr>
               )}
             </tbody>
             <tfoot>
               <tr>
                 <th>Итого</th>
                 <th>{contents.totalQty}</th>
                 <th colSpan={2}>{contents.totalPrice}&nbsp;₽</th>
               </tr>
             </tfoot>
           </table>
          }
          {(!isEmpty(contents) && contents.totalQty > 0) &&
          <div>
            <button style={{cursor: "pointer"}} className="btn btn-danger" onClick={this.clear}>Очистить</button>
            <button style={{cursor: "pointer"}} className="btn btn-primary float-right" onClick={this.order}>Оформить заказ</button>
          </div>
          }
        </div>
      </div>
    );
  }
}
