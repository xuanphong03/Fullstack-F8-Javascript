const ADD = "add_product";
const REDUCE = "reduce_product";
const REMOVE = "remove_product";
const CART_DATA = JSON.parse(localStorage.getItem("cart")) || [];

export { ADD, REDUCE, REMOVE, CART_DATA };
