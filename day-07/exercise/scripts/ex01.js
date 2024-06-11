let ex01_input = document.querySelector(".ex01_input");
let ex01_output = document.querySelector(".ex01_output");

function findMinSymmetricPrimeNumber(number) {
  while (number) {
    number++;
    if (checkPrimeNumber(number) && checkSysmmetricNumber(number)) {
      return number;
    }
  }
}

function checkPrimeNumber(number) {
  if (number === 1) {
    return false;
  }
  if (number === 2 || number === 3) {
    return true;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

function checkSysmmetricNumber(number) {
  let tempNum = number;
  let sysmmetricNumber = 0;
  while (tempNum > 0) {
    sysmmetricNumber = sysmmetricNumber * 10 + (tempNum % 10);
    tempNum = Math.floor(tempNum / 10);
  }
  return number === sysmmetricNumber;
}

let input = 13;
let output = findMinSymmetricPrimeNumber(input);
ex01_input.innerText = `Input: ${input}`;
ex01_output.innerText = `Output: ${output}`;
