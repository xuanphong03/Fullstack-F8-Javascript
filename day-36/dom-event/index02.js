// var slider1 = document.querySelector(".slider-1");
// var slider2 = document.querySelector(".slider-2");

// slider1.addEventListener("finish", function () {
//   console.log("Oke chưa");
// });
// slider2.addEventListener("finish", function () {
//   console.log("Oke chưa");
// });
// var imageURL = `./images/product01.png`;
// var btn = document.querySelector("button");
// var form = document.querySelector("form");

// btn.addEventListener("click", function (e) {
//   // var a = document.createElement("a");
//   // a.href = imageURL;
//   // a.download = "Produc01.png";
//   // a.click();
//   form.submit();
// });

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   var input = this.querySelector("input").value;
//   console.log(input);
// });
HTMLElement.prototype.change = function () {
  var changeEvent = new Event("change");
  this.dispatchEvent(changeEvent);
};

var minusBtn = document.querySelector(".minus-btn");
var plusBtn = document.querySelector(".plus-btn");
var quantityInput = document.querySelector("input[type='number']");

// var changeEvent = new Event("change");

minusBtn.addEventListener("click", () => {
  if (quantityInput.value > 1) {
    quantityInput.value--;
    // quantityInput.dispatchEvent(changeEvent);
    quantityInput.change();
  }
});

plusBtn.addEventListener("click", () => {
  quantityInput.value++;
  // quantityInput.dispatchEvent(changeEvent);
  quantityInput.change();
});

quantityInput.addEventListener("change", () => {
  console.log(`Quantity: ${quantityInput.value}`);
});
