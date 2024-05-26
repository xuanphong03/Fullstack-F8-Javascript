let ex01_number = document.getElementById("ex01_number");
let ex01_btnSubmit = document.getElementById("ex01_btnSubmit");
let ex01_result = document.getElementById("ex01_result");

function fibonacci(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

ex01_btnSubmit.onclick = function showFibonacci() {
  let n = parseFloat(ex01_number.value);
  if (n % 1 !== 0 || n < 1) {
    ex01_result.innerText = "Vui lòng nhập vào 1 số nguyên lớn hơn hoặc bằng 1";
    return;
  }
  let result = "";
  for (let i = 1; i <= n; i++) {
    result += `<div>Fibonacci(${i}) = ${fibonacci(i)}</div>`;
  }
  ex01_result.innerHTML = result;
};
