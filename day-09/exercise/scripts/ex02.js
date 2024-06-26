var price = "1000";
Object.prototype.getCurrency = function (currencyUnit) {
  var currency = String(this);
  var result = "";
  var count = 0;
  for (var i = currency.length - 1; i >= 0; i--) {
    result = currency[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = "," + result;
    }
  }
  return `${result} ${currencyUnit}`;
};

var ex02_input = document.querySelector(".ex02_input");
var ex02_output = document.querySelector(".ex02_output");

var ex02_data = 100000;
ex02_input.innerText = `Input: ${ex02_data}`;
ex02_output.innerText = `Output: ${ex02_data.getCurrency("VNĐ")}`;
