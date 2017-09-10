import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import {clearCart, removeFromCart} from "../action/cart";

import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import {MENU_PAGE_ROUTE, ORDER_PAGE_ROUTE} from "../routes";
import {CART_MODE_MENU} from "../config";

@withRouter
@connect(state => ({
  contents: state.cart.get("contents"),
}), {clearCart, removeFromCart})
export default class Cart extends Component {
  static propTypes = {
    clearCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    mode: PropTypes.string
  };

  static defaultProps = {
    mode: CART_MODE_MENU
  };

  remove = id => () => {
    this.props.removeFromCart(id);
  };

  clear = () => {
    this.props.clearCart();
  };

  order = () => {
    const {history, clearCart, mode} = this.props;
    const isInMenu = CART_MODE_MENU === mode;

    if (isInMenu) {
      history.push(ORDER_PAGE_ROUTE);
    } else {
      clearCart();
      history.push(MENU_PAGE_ROUTE);
    }
  };

  render() {
    const {contents, mode} = this.props;
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
           <div className="card-text">Ничего не выбрано</div>
            :
           <table className={`table ${isInMenu && "table-sm"}`}>
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