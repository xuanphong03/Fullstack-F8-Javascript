let ex02_number = document.getElementById("ex02_number");
let ex02_btnSubmit = document.getElementById("ex02_btnSubmit");
let ex02_result = document.getElementById("ex02_result");

ex02_btnSubmit.onclick = function reverse() {
  let number = parseFloat(ex02_number.value);
  if (number % 1 !== 0) {
    ex02_result.innerText = "Vui lòng nhập 1 số nguyên";
    return;
  }
  let reversedNumber = "";
  while (number > 0) {
    console.log(number);
    reversedNumber += number % 10;
    number = Math.floor(number / 10);
  }
  ex02_result.innerText = reversedNumber;
};
