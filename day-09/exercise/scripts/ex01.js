function sum(...nums) {
  var inputData = nums[0];
  var errorMessage = "Dữ liệu truyền vào không hợp lệ";
  for (var num of inputData) {
    if (typeof num !== "number") {
      console.log(num);
      return errorMessage;
    }
  }
  return inputData.reduce(function (pre, cur) {
    return pre + cur;
  });
}

var ex01_input = document.querySelector(".ex01_input");
var ex01_output = document.querySelector(".ex01_output");

var ex01_data = [1, 2, 3, 4, 5];
ex01_input.innerText = `Input: ${ex01_data}`;
ex01_output.innerText = `Output: ${sum(ex01_data)}`;
