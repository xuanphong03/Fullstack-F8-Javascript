let ex01_input1 = document.querySelector(".ex01_input1");
let ex01_input2 = document.querySelector(".ex01_input2");
let ex01_output = document.querySelector(".ex01_output");

let arrA = [1, 1, 1, 4, 3, 2];
let arrB = [5, 2, 6, 7, 1, 1];

function findIdenticalElements(arrA, arrB) {
  let array1 = [...arrA].sort();
  let array2 = [...arrB].sort();
  let i = 0,
    j = 0;
  let arrOutput = [];
  while (i < array1.length && j < array2.length) {
    while (array1[i] === array1[i + 1]) {
      i++;
    }
    while (array2[j] === array2[j + 1]) {
      j++;
    }
    if (array1[i] === array2[j]) {
      arrOutput[arrOutput.length] = array1[i];
      j++;
    } else {
      i++;
    }
  }
  return arrOutput;
}
ex01_input1.innerText = `arrA: [${arrA}]`;
ex01_input2.innerText = `arrB: [${arrB}]`;
let resultEx01 = findIdenticalElements(arrA, arrB);
ex01_output.innerText = ` Kết quả: [${resultEx01}] `;
