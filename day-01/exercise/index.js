// Bài 1
let number_1 = document.getElementById("number_1");
let number_2 = document.getElementById("number_2");
let number_1_afterHandle = document.getElementById("number_1-afterHandle");
let number_2_afterHandle = document.getElementById("number_2-afterHandle");
let btnSubmit = document.getElementById("btnSubmit");
console.log(number_1.value);

btnSubmit.onclick = function sw() {
  let num1 = parseFloat(number_1.value); // 4
  let num2 = parseFloat(number_2.value); // 10

  num1 = num1 + num2; // 14
  num2 = num1 - num2; // 14 -10 = 4
  num1 = num1 - num2; // 14 - 4 = 10

  number_1_afterHandle.innerText = num1;
  number_2_afterHandle.innerText = num2;
};

// btnSubmit.addEventListener("click", sw());

let resultEx2 = document.getElementById("resultEx2");
resultEx2.innerText = 10 + 20 + 5 ** 10 / 2;

// Bài 3
let ex03_num1 = document.getElementById("ex03_number_1");
let ex03_num2 = document.getElementById("ex03_number_2");
let ex03_num3 = document.getElementById("ex03_number_3");
let ex03_btnSubmit = document.getElementById("ex03_btnSubmit");
let ex03_result = document.getElementById("ex03_result");

ex03_btnSubmit.onclick = function findMax() {
  let num1 = ex03_num1.value;
  let num2 = ex03_num2.value;
  let num3 = ex03_num3.value;
  let arrNumber = [num1, num2, num3];
  let max = num1;
  for (let i = 1; i < arrNumber.length; i++) {
    max = arrNumber[i] > max ? arrNumber[i] : max;
  }
  ex03_result.innerText = max;
};

// Bài 4
let ex04_num1 = document.getElementById("ex04_number_1");
let ex04_num2 = document.getElementById("ex04_number_2");
let ex04_btnSubmit = document.getElementById("ex04_btnSubmit");
let ex04_result = document.getElementById("ex04_result");

ex04_btnSubmit.onclick = function check() {
  let num1 = parseFloat(ex04_num1.value);
  let num2 = parseFloat(ex04_num2.value);
  if ((num1 > 0 && num2 > 0) || (num1 < 0 && num2 < 0)) {
    ex04_result.innerText = "2 số cùng dấu";
  } else {
    ex04_result.innerText = "2 số trái dấu";
  }
};

// Bài 5
let ex05_number_1 = document.getElementById("ex05_number_1");
let ex05_number_2 = document.getElementById("ex05_number_2");
let ex05_number_3 = document.getElementById("ex05_number_3");
let ex05_btnSubmit = document.getElementById("ex05_btnSubmit");
let ex05_result_origin = document.getElementById("ex05_result_origin");
let ex05_result = document.getElementById("ex05_result");

ex05_btnSubmit.onclick = function arrange() {
  let num1 = parseFloat(ex05_number_1.value);
  let num2 = parseFloat(ex05_number_2.value);
  let num3 = parseFloat(ex05_number_3.value);
  const arrNumber = [num1, num2, num3];
  ex05_result_origin.innerText = `${num1} ${num2} ${num3}`;

  /*  
    5 4 3
    4 5 3
    4 3 5
    3 4 5
    3 4 5 
*/
  let n = arrNumber.length;
  //   for (let i = 0; i < n - 1; i++) {
  //     for (let j = 0; j < n - 1 - i; j++) {
  //       if (arrNumber[j] > arrNumber[j + 1]) {
  //         let temp = arrNumber[j + 1];
  //         arrNumber[j + 1] = arrNumber[j];
  //         arrNumber[j] = temp;
  //       }
  //     }
  //   }
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arrNumber[minIndex] > arrNumber[j]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arrNumber[minIndex];
      arrNumber[minIndex] = arrNumber[i];
      arrNumber[i] = temp;
    }
  }
  let kq = "";
  for (let i = 0; i < arrNumber.length; i++) {
    kq += arrNumber[i] + " ";
  }
  ex05_result.innerText = kq;
};
