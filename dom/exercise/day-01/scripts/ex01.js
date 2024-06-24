Array.prototype.push2 = function (...elements) {
  for (var i = 0; i < elements.length; i++) {
    this[this.length] = elements[i];
  }
  return this.length;
};

var numbers = [1, 2, 3, 4];
console.log(numbers);

var ex01_input = document.querySelector(".ex01_input");
var ex01_output = document.querySelector(".ex01_output");

ex01_input.innerHTML = `Input:  numbers = [1, 2, 3, 4]; numbers.push2(5)`;
ex01_output.innerHTML = `Output: ${numbers.push2(5)}`;
