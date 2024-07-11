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

let totalCartProductQuantity = 0;
let totalCartProductCost = 0;
let cartProductSTT = 0;

const ADD = "add_product";
const REDUCE = "reduce_product";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let isEmptyCart = cart.length === 0;

const handleShowCartList = function () {
  const emptyMessage = root.querySelector(".cart-heading");
  if (emptyMessage.nextElementSibling) {
    root.removeChild(emptyMessage.nextElementSibling);
  }

  const cartList = utils.createElement(
    "div",
    {},
    utils.createElement(
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
    ),
    utils.createElement("hr"),
    utils.createElement(
      "div",
      {},
      utils.createElement(
        "button",
        { className: "update-cart-btn", onClick: handleUpdateAllCartProduct },
        "Cập nhật giỏ hàng"
      ),
      utils.createElement(
        "button",
        { className: "remove-cart-btn", onClick: removeAllCartProduct },
        "Xóa giỏ hàng"
      )
    )
  );
  utils.render(root, cartList);

  const tbodyEl = cartList.querySelector("tbody");
  cart.forEach(function (item, index) {
    const { productId, productQuantity, productName, productPrice } = item;
    const row = utils.createElement(
      "tr",
      { className: "product-item", "data-id": `${productId}` },
      utils.createElement(
        "td",
        { className: "productSTT" },
        `${++cartProductSTT}`
      ),
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
        `${productPrice * productQuantity}`
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
    utils.render(tbodyEl, row);
    updateCart(productQuantity, productPrice * productQuantity, ADD);
  });
};

const handleRemoveCartList = function () {
  const cartHeading = root.querySelector(".cart-heading");
  root.removeChild(cartHeading.nextElementSibling);

  const emptyEl = utils.createElement(
    "p",
    {
      className: "",
    },
    "Giỏ hàng không có sản phẩm"
  );

  utils.render(root, emptyEl);
};

const updateCart = function (quantity, price, action) {
  switch (action) {
    case ADD:
      totalCartProductQuantity += quantity;
      totalCartProductCost += price;
      break;
    case REDUCE:
      totalCartProductQuantity -= quantity;
      totalCartProductCost -= price;
      break;
    default:
      throw new Error("Action không hợp lệ...");
  }

  if (!totalCartProductQuantity && !isEmptyCart) {
    handleRemoveCartList();
    isEmptyCart = true;
    return;
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

  if (productQuantity <= 0) {
    alert("Số lượng không sản phẩm không được nhỏ hơn 0");
    productQuantityEl.value = 1;
    return;
  }

  // reset lại số lượng ban nhau của các sản phẩm khác được thay đổi nhưng chưa update
  if (totalCartProductQuantity > 0) {
    const tbodyCartListEl = root.querySelector(".cart-list tbody");
    Array.from(tbodyCartListEl.querySelectorAll("tr")).forEach(
      (cartItem, index) => {
        const cartItemQuantityEl = cartItem.querySelector(".product-quantity");
        cartItemQuantityEl.value = cart[index]?.productQuantity;
      }
    );
  }

  // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa ?
  // Nếu có thì thay đổi số lượng, giá, thành tiền
  // Nếu chưa có thì thêm mới
  const cartProduct = root.querySelector(
    `.cart-list tr[data-id='${productId}']`
  );
  if (cartProduct) {
    const prevTotalQuantity =
      cartProduct.querySelector(".product-quantity").value;
    if (productQuantity + prevTotalQuantity > 99999) {
      alert("Tổng số lượng của 1 loại sản phẩm không được quá 99999");
      productQuantityEl.value = 1;
      return;
    }

    const cartProductQuantityEl =
      cartProduct.querySelector(".product-quantity");
    const cartProductTotalCostEl = cartProduct.querySelector(
      ".product-total-cost"
    );

    let cartProductQuantity =
      +cartProductQuantityEl.innerText + productQuantity;
    let cartProductTotalCost = +cartProductTotalCostEl.innerText + totalCost;
    let newQuantity = +cartProductQuantityEl.value + cartProductQuantity;
    cartProductQuantityEl.value = newQuantity;

    cartProductTotalCostEl.innerText = cartProductTotalCost;

    updateCart(productQuantity, totalCost, ADD);
    const position = cart.map((item) => item.productId).indexOf(productId);
    if (position !== -1) {
      cart[position] = {
        ...cart[position],
        productQuantity: newQuantity,
        productPrice,
      };

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } else {
    if (productQuantity > 99999) {
      alert("Số lượng sản phẩm không được quá 999999");
      productQuantityEl.value = 1;
      return;
    }
    if (isEmptyCart) {
      handleShowCartList();
      isEmptyCart = false;
    }

    const tbodyCartListEl = root.querySelector(".cart-list tbody");
    const newCartProduct = utils.createElement(
      "tr",
      { className: "product-item", "data-id": `${productId}` },
      utils.createElement(
        "td",
        { className: "productSTT" },
        `${++cartProductSTT}`
      ),
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
    handleUpdateOrderNumber();

    // Save Data
    cart.push({
      productId,
      productQuantity,
      productName,
      productPrice,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const removeCartProduct = function () {
  if (!confirm("Bạn chắc chắn muốn xóa?")) {
    return;
  }
  alert("Xóa thành công");
  const cartList = root.querySelector(".cart-list");
  const tbodyCartListEl = cartList.querySelector("tbody");
  const productId = this.dataset.id;

  const productItemEl = tbodyCartListEl.querySelector(
    `tr[data-id='${productId}']`
  );
  const productPriceEl = productItemEl.querySelector(".product-total-cost");
  const productQuantityEl = productItemEl.querySelector(".product-quantity");

  let productPrice = +productPriceEl.innerText;
  let productQuantity = +productQuantityEl.value;

  updateCart(productQuantity, productPrice, REDUCE);
  tbodyCartListEl.removeChild(productItemEl);
  handleUpdateOrderNumber();

  // Local storage
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));

  // reset lại số lượng ban nhau của các sản phẩm khác được thay đổi nhưng chưa update
  Array.from(tbodyCartListEl.querySelectorAll("tr")).forEach(
    (cartItem, index) => {
      const cartItemQuantityEl = cartItem.querySelector(".product-quantity");
      cartItemQuantityEl.value = cart[index]?.productQuantity;
    }
  );
};

const removeAllCartProduct = function () {
  if (!confirm("Bạn muốn chắc chắn muốn xóa giỏ hàng chứ?")) return;
  totalCartProductCost = 0;
  totalCartProductQuantity = 0;
  if (!isEmptyCart) {
    handleRemoveCartList();
    isEmptyCart = true;
  }
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
};

const handleUpdateOrderNumber = function () {
  const tbodyEl = root.querySelectorAll(".cart-list tbody tr");
  tbodyEl.forEach((cartProductItem, stt) => {
    const productSTTEl = cartProductItem.querySelector(".productSTT");
    productSTTEl.innerText = ++stt;
  });
};

const handleUpdateAllCartProduct = function () {
  const tbodyEl = root.querySelector(".cart-list tbody");
  const rows = tbodyEl.querySelectorAll("tr");
  rows.forEach((cartProductItem, index) => {
    const unitPriceEl = cartProductItem.querySelector(".product-price");
    const quantityEl = cartProductItem.querySelector(".product-quantity");
    const totalCostEl = cartProductItem.querySelector(".product-total-cost");
    let productId = cartProductItem.dataset.id;
    let unitPrice = +unitPriceEl.innerText;
    let quantity = +quantityEl.value;
    let newTotalCost = unitPrice * quantity;

    // Lấy vị trí của sản phẩm ở trong cart trên local storage
    let position = cart.map((item) => item.productId).indexOf(productId);
    // Nếu sản phẩm = 0 ===> Xóa sản phẩm
    let prevQuantity = cart[position]?.productQuantity;
    let prevTotalPrice = prevQuantity * unitPrice;
    if (quantity <= 0) {
      tbodyEl.removeChild(cartProductItem);
      updateCart(prevQuantity, prevTotalPrice, REDUCE);
      cart = cart.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      // Nếu  productQuantity được thêm vào <= 99999 và tổng số lượng productQuantity <= 1000000
      // thì mới cộng thêm thêm quantity. Ngược lại +1
      if (quantity <= 99999) {
        let changedQuantity = Math.abs(
          +totalCostEl.innerText / unitPrice - quantity
        );
        let changedTotalCost = Math.abs(+totalCostEl.innerText - newTotalCost);
        const ACTION = +totalCostEl.innerText <= newTotalCost ? ADD : REDUCE;
        updateCart(changedQuantity, changedTotalCost, ACTION);

        totalCostEl.innerText = newTotalCost;
        cart[position] = {
          ...cart[position],
          productQuantity: quantity,
        };
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        let changedQuantity = prevQuantity - 1;
        let changedTotalCost = changedQuantity * unitPrice;
        console.log({
          changedQuantity,
          changedTotalCost,
        });
        updateCart(changedQuantity, changedTotalCost, REDUCE);
        quantityEl.value = 1;
        totalCostEl.innerText = unitPrice;
        cart[position] = {
          ...cart[position],
          productQuantity: 1,
        };
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  });
  // Cập nhật lại số thứ tự
  handleUpdateOrderNumber();
  // Thông báo thành công :<
  alert("Cập nhật giỏ hàng thành công!");
};

// Render Danh sách sản phẩm
const renderCartList = () => {
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
};
renderCartList();

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
