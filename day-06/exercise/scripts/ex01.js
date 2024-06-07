let ex01_input1 = document.querySelector(".ex01_input1");
let ex01_input2 = document.querySelector(".ex01_input2");
let ex01_output = document.querySelector(".ex01_output");

let arrA = [1, 1, 1, 4, 3, 2];
let arrB = [5, 2, 6, 7, 1, 1];

let output = [];
arrA.forEach((item) => {
  if (!output.includes(item) && arrB.includes(item)) {
    output.push(item);
  }
});

ex01_input1.innerText = `arrA: [${arrA}]`;
ex01_input2.innerText = `arrB: [${arrB}]`;
ex01_output.innerText = ` Kết quả: [${output}] `;
