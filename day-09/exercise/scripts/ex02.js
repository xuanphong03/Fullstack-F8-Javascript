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

console.log(price.getCurrency("đ"));
