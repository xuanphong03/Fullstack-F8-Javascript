//Viết làm vòng lặp filter trong Array. Đặt tên là filter2()
Array.prototype.filter2 = function (callbackFn) {
  var newArray = [];
  for (var i = 0; i < this.length; i++) {
    var element = this[i];
    var index = i;
    var originArray = this;
    if (callbackFn(element, index, originArray)) {
      newArray.push(element);
    }
  }
  return newArray;
};

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var ex02_input = document.querySelector(".ex02_input");
var ex02_output = document.querySelector(".ex02_output");

ex02_input.innerHTML = `Input:   numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; numbers.filter2(element => element % 2 === 0)`;
ex02_output.innerHTML = `Output: [${numbers.filter2(
  (element) => element % 2 === 0
)}]`;
