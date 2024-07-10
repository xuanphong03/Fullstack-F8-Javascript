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

let isEmptyCart = false;
let totalCartProductQuantity = 0;
let totalCartProductCost = 0;
let cartProductSTT = 0;

const ADD = "add_product";
const REDUCE = "reduce_product";
const REMOVE = "remove_product";

const updateCart = function (quantity, price, action) {
  switch (action) {
    case ADD:
      totalCartProductQuantity += quantity;
      totalCartProductCost += price;
      break;
    case REDUCE:
      break;
    case REMOVE:
      totalCartProductQuantity -= quantity;
      totalCartProductCost -= price;
      console.log({
        totalCartProductCost,
        totalCartProductQuantity,
      });
      break;
    default:
      console.log("Lỗi");
  }

  const totalRow = root.querySelector(".cart-list tfoot");
  const totalCostEl = totalRow.querySelector(".total-cost");
  const totalQuantityEl = totalRow.querySelector(".total-quantity");

  totalCostEl.innerText = totalCartProductCost;
  totalQuantityEl.innerText = totalCartProductQuantity;
};

const addProductToCart = function (e) {
  const productId = this.dataset.id;
  const productItemEl = root.querySelector(
    `.product-list tr[data-id='${productId}']`
  );
  const productNameEl = productItemEl.querySelector(".product-name");
  const productPriceEl = productItemEl.querySelector(".product-price");
  const productQuantityEl = productItemEl.querySelector(".product-quantity");

  let productName = productNameEl.innerText;
  let productPrice = +productPriceEl.innerText;
  let productQuantity = +productQuantityEl.value;
  if (isNaN(productPrice) || isNaN(productQuantity)) return;
  let totalCost = productPrice * productQuantity;

  // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa ?
  // Nếu có thì thay đổi số lượng, giá, thành tiền
  // Nếu chưa có thì thêm mới
  const cartProduct = root.querySelector(
    `.cart-list tr[data-id='${productId}']`
  );
  if (cartProduct) {
    const cartProductQuantityEl =
      cartProduct.querySelector(".product-quantity");
    const cartProductTotalCostEl = cartProduct.querySelector(
      ".product-total-cost"
    );

    let cartProductQuantity =
      +cartProductQuantityEl.innerText + productQuantity;
    let cartProductTotalCost = +cartProductTotalCostEl.innerText + totalCost;

    cartProductQuantityEl.innerText = cartProductQuantity;
    cartProductTotalCostEl.innerText = cartProductTotalCost;

    updateCart(productQuantity, totalCost, ADD);
  } else {
    const tbodyCartListEl = root.querySelector(".cart-list tbody");
    const newCartProduct = utils.createElement(
      "tr",
      { className: "product-item", "data-id": `${productId}` },
      utils.createElement("td", {}, `${++cartProductSTT}`),
      utils.createElement(
        "td",
        { className: "product-name" },
        `${productName}`
      ),
      utils.createElement(
        "td",
        { className: "product-price" },
        `${productPrice}`
      ),
      utils.createElement(
        "td",
        {},
        utils.createElement("input", {
          type: "number",
          value: `${productQuantity}`,
          min: "1",
          className: "product-quantity",
        })
      ),
      utils.createElement(
        "td",
        { className: "product-total-cost" },
        `${totalCost}`
      ),
      utils.createElement(
        "td",
        {},
        utils.createElement(
          "button",
          {
            className: "remove-btn",
            "data-id": `${productId}`,
            onClick: removeCartProduct,
          },
          "Xóa"
        )
      )
    );
    utils.render(tbodyCartListEl, newCartProduct);

    updateCart(productQuantity, totalCost, ADD);
  }
};

const removeCartProduct = function () {
  const tbodyCartListEl = root.querySelector(".cart-list tbody");
  const productId = this.dataset.id;

  const productItemEl = tbodyCartListEl.querySelector(
    `tr[data-id='${productId}']`
  );
  const productPriceEl = productItemEl.querySelector(".product-price");
  const productQuantityEl = productItemEl.querySelector(".product-quantity");

  let productPrice = +productPriceEl.innerText;
  let productQuantity = +productQuantityEl.value;

  updateCart(productQuantity, productPrice, REMOVE);
  tbodyCartListEl.removeChild(productItemEl);
};

const productList = utils.createElement(
  "table",
  { className: "product-list" },
  utils.createElement(
    "thead",
    {},
    utils.createElement(
      "tr",
      {},
      utils.createElement("th", {}, "STT"),
      utils.createElement("th", {}, "Tên sản phẩm"),
      utils.createElement("th", {}, "Giá"),
      utils.createElement("th", {}, "Thêm vào giỏ hàng")
    )
  ),
  utils.createElement(
    "tbody",
    {},
    utils.createElement(
      "tr",
      { className: "product-item", "data-id": 1 },
      utils.createElement("td", {}, "1"),
      utils.createElement("td", { className: "product-name" }, "Sản phẩm 1"),
      utils.createElement("td", { className: "product-price" }, "1000"),
      utils.createElement(
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
          { className: "add-btn", onClick: addProductToCart, "data-id": 1 },
          "Thêm vào giỏ hàng"
        )
      )
    ),
    utils.createElement(
      "tr",
      { className: "product-item", "data-id": 2 },
      utils.createElement("td", {}, "2"),
      utils.createElement("td", { className: "product-name" }, "Sản phẩm 2"),
      utils.createElement("td", { className: "product-price" }, "2000"),
      utils.createElement(
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
          { className: "add-btn", onClick: addProductToCart, "data-id": 2 },
          "Thêm vào giỏ hàng"
        )
      )
    ),
    utils.createElement(
      "tr",
      { className: "product-item", "data-id": 3 },
      utils.createElement("td", {}, "3"),
      utils.createElement("td", { className: "product-name" }, "Sản phẩm 3"),
      utils.createElement("td", { className: "product-price" }, "3000"),
      utils.createElement(
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
          { className: "add-btn", onClick: addProductToCart, "data-id": 3 },
          "Thêm vào giỏ hàng"
        )
      )
    ),
    utils.createElement(
      "tr",
      { className: "product-item", "data-id": 4 },
      utils.createElement("td", {}, "4"),
      utils.createElement("td", { className: "product-name" }, "Sản phẩm 4"),
      utils.createElement("td", { className: "product-price" }, "4000"),
      utils.createElement(
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
          { className: "add-btn", onClick: addProductToCart, "data-id": 4 },
          "Thêm vào giỏ hàng"
        )
      )
    )
  )
);
utils.render(root, productList);

const cartHeading = utils.createElement(
  "h2",
  {
    className: "cart-heading",
    id: "cart-heading",
  },
  "Giỏ hàng"
);
utils.render(root, cartHeading);

const emptyEl = utils.createElement(
  "p",
  {
    className: "",
  },
  "Giỏ hàng không có sản phẩm"
);

if (isEmptyCart) {
  utils.render(root, emptyEl);
} else {
  const cartList = utils.createElement(
    "table",
    { className: "cart-list" },
    utils.createElement(
      "thead",
      {},
      utils.createElement(
        "tr",
        {},
        utils.createElement("th", {}, "STT"),
        utils.createElement("th", {}, "Tên sản phẩm"),
        utils.createElement("th", {}, "Giá"),
        utils.createElement("th", {}, "Số lượng"),
        utils.createElement("th", {}, "Thành tiền"),
        utils.createElement("th", {}, "Thêm vào giỏ hàng")
      )
    ),

    utils.createElement("tbody"),

    utils.createElement(
      "tfoot",
      {},
      utils.createElement(
        "tr",
        {},
        utils.createElement("td", {}, "Tổng"),
        utils.createElement(
          "td",
          { className: "total-quantity" },
          `${totalCartProductQuantity}`
        ),
        utils.createElement(
          "td",
          { className: "total-cost" },
          `${totalCartProductCost}`
        )
      )
    )
  );
  utils.render(root, cartList);

  const line = utils.createElement("hr");
  utils.render(root, line);
}
