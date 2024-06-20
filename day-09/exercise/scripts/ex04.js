Array.prototype.reduce2 = function (callback, initialValue) {
  var result;
  var prevValue = initialValue || this[0];
  var idxStart = initialValue ? 0 : 1;
  for (idxStart; idxStart < this.length; idxStart++) {
    result = callback(prevValue, this[idxStart]);
    prevValue = result;
  }
  return result;
};

var ex04_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var ex04_result = ex04_data.reduce2(function (prev, cur) {
  return prev + cur;
});
var ex04_input = document.querySelector(".ex04_input");
var ex04_output = document.querySelector(".ex04_output");

ex04_input.innerText = `Input: ${ex04_data}`;
ex04_output.innerText = `Output: (tính tổng input) ${ex04_result}`;
