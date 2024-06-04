let ex02_input = document.querySelector(".ex02_input");
let ex02_output = document.querySelector(".ex02_output");
let ex02_array_input = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
ex02_input.innerText = `Mảng cho trước [${ex02_array_input}]`;

function calcAverageOfPrimeNumber(arr) {
  let sumPrimeNumber = 0;
  let countPrimeNumber = 0;
  for (let i = 0; i < arr.length; i++) {
    if (checkPrimeNumber(arr[i])) {
      countPrimeNumber++;
      sumPrimeNumber += arr[i];
    }
  }
  if (countPrimeNumber !== 0) {
    hasPrimeNumber = true;
    return sumPrimeNumber / countPrimeNumber;
  }
  return "Mảng đã cho không có số nguyên tố nào cả !";
}

function checkPrimeNumber(num) {
  if (num === 1) {
    return false;
  }
  if (num === 2 || num === 3) {
    return true;
  }
  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

ex02_output.innerText = `Kết quả: ${calcAverageOfPrimeNumber(
  ex02_array_input
)} `;
