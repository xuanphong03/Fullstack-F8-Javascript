function sum(...nums) {
  var errorMessage = "Dữ liệu truyền vào không hợp lệ";
  var result = 0;
  for (var i = 0; i < nums.length; i++) {
    if (typeof nums[i] !== "number") {
      return errorMessage;
    }
    result += nums[i];
  }
  return result;
}

console.log(sum(1, 2, 3, 4, "5"));
