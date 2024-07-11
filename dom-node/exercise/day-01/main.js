import { addProductToCart, handleShowCartList } from "./funcs.js";
import { CART_DATA } from "./constants.js";

const root = document.querySelector("#root");

const productHeading = utils.createElement(
  "h2",
  {
    className: "product-heading",
    id: "product-heading",
  },
  "Danh sách sản phẩm"
);
utils.render(root, productHeading);

let isEmptyCart = CART_DATA.length === 0;

// Render Danh sách sản phẩm
(() => {
  const tableEl = utils.createElement("table", { className: "product-list" });
  const theadEl = utils.createElement("thead");
  const trEl = utils.createElement("tr");
  utils.render(tableEl, theadEl);
  utils.render(theadEl, trEl);
  ["STT", "Tên sản phẩm", "Giá", "Thêm giỏ hàng"].forEach((label) => {
    const thEl = utils.createElement("th", {}, label);
    utils.render(trEl, thEl);
  });

  const productList = [
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 1000,
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      price: 2000,
    },
    {
      id: 3,
      name: "Sản phẩm 3",
      price: 3000,
    },
    {
      id: 4,
      name: "Sản phẩm 4",
      price: 4000,
    },
  ];
  const tbodyEl = utils.createElement("tbody");
  utils.render(tableEl, tbodyEl);
  productList.forEach((product, index) => {
    const { id, name, price } = product;
    const trEl = utils.createElement("tr", {
      className: "product-item",
      "data-id": id,
    });
    const tdCountEl = utils.createElement("td", {}, ++index);
    const tdProductNameEl = utils.createElement(
      "td",
      { className: "product-name" },
      name
    );
    const tdProductPrice = utils.createElement(
      "td",
      { className: "product-price" },
      price
    );
    const tdActionsEl = utils.createElement(
      "td",
      {},
      utils.createElement("input", {
        type: "number",
        value: 1,
        min: "1",
        className: "product-quantity",
      }),
      utils.createElement("br"),
      utils.createElement(
        "button",
        { className: "add-btn", onClick: addProductToCart, "data-id": id },
        "Thêm vào giỏ hàng"
      )
    );
    utils.render(trEl, tdCountEl);
    utils.render(trEl, tdProductNameEl);
    utils.render(trEl, tdProductPrice);
    utils.render(trEl, tdActionsEl);
    utils.render(tbodyEl, trEl);
  });
  utils.render(root, tableEl);
})();

const cartHeading = utils.createElement(
  "h2",
  {
    className: "cart-heading",
    id: "cart-heading",
  },
  "Giỏ hàng"
);
utils.render(root, cartHeading);

if (isEmptyCart) {
  const emptyEl = utils.createElement(
    "p",
    {
      className: "",
    },
    "Giỏ hàng không có sản phẩm"
  );

  utils.render(root, emptyEl);
} else {
  handleShowCartList();
}
