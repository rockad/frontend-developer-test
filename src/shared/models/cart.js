class CartModel {
  products = {};
  totalQty = 0;
  totalPrice = 0;

  parse = (contents) => {
    if (contents) {
      this.products = contents.products ? contents.products : {};
      this.totalQty = contents.totalQty ? contents.totalQty : 0;
      this.totalPrice = contents.totalPrice ? contents.totalPrice : 0;
    }
  };

  add = (product) => {
    const id = product.id;
    const price = parseInt(product.price, 10);

    if (Object.prototype.hasOwnProperty.call(this.products, id)) {
      this.products[id].qty += 1;
      this.products[id].total += price;
    } else {
      this.products[id] = {...product, qty: 1, total: price};
    }

    this.totalQty += 1;
    this.totalPrice += price;
  };

  remove = (id) => {
    const product = this.products[id];

    this.totalQty -= product.qty;
    this.totalPrice -= product.total;

    delete this.products[id];
  };

  get contents() {
    return {
      products: this.products,
      totalQty: this.totalQty,
      totalPrice: this.totalPrice
    };
  }
}

export default CartModel;
