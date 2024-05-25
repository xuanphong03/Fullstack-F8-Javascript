// Bài 1
const ex01_kmNumber_input = document.getElementById("ex01_kmNum_input");
const ex01_btnSubmit = document.getElementById("ex01_btnSubmit");
const ex01_totalTaxiCost = document.getElementById("ex01_totalTaxiCost");

ex01_btnSubmit.onclick = function calculateTaxiCost() {
  let kmNumber = parseFloat(ex01_kmNumber_input.value);
  let totalTaxiCost;
  const priceLevel_1 = 15000;
  const priceLevel_2 = 13500;
  const priceLevel_3 = 11000;

  if (isNaN(kmNumber) || kmNumber < 0) {
    alert("Số km không hợp lệ");
    return;
  } else if (kmNumber >= 0 && kmNumber <= 1) {
    totalTaxiCost = kmNumber * priceLevel_1;
  } else if (kmNumber > 1 && kmNumber <= 5) {
    totalTaxiCost = 1 * priceLevel_1 + (kmNumber - 1) * priceLevel_2;
  } else {
    totalTaxiCost =
      1 * priceLevel_1 + 4 * priceLevel_2 + (kmNumber - 5) * priceLevel_3;
  }
  if (kmNumber > 120) {
    totalTaxiCost = totalTaxiCost * 0.9;
  }
  ex01_totalTaxiCost.innerText = `${totalTaxiCost} VNĐ`;
};

// Bài 2
let ex02_consumedElectricity = document.getElementById(
  "ex02_consumedElectricity"
);
let ex02_btnSubmit = document.getElementById("ex02_btnSubmit");
let ex02_totalElectricityBill = document.getElementById(
  "ex02_totalElectricityBill"
);

ex02_btnSubmit.onclick = function calculateElectricityBill() {
  let consumedElectricity = ex02_consumedElectricity.value;
  if (isNaN(consumedElectricity) || consumedElectricity < 0) {
    ex02_totalElectricityBill.innerText =
      "Số điện tiêu thụ phải lớn hơn hoặc bằng 0";
  } else {
    const priceLevel1 = 1.678;
    const priceLevel2 = 1.734;
    const priceLevel3 = 2.014;
    const priceLevel4 = 2.536;
    const priceLevel5 = 2.834;
    const priceLevel6 = 2.927;
    let totalElectricityBill;
    if (consumedElectricity <= 50) {
      totalElectricityBill = priceLevel1 * consumedElectricity;
    } else if (consumedElectricity > 50 && consumedElectricity <= 100) {
      totalElectricityBill =
        priceLevel1 * 50 + priceLevel2 * (consumedElectricity - 50);
    } else if (consumedElectricity > 100 && consumedElectricity <= 200) {
      totalElectricityBill =
        priceLevel1 * 50 +
        priceLevel2 * 50 +
        priceLevel3 * (consumedElectricity - 100);
    } else if (consumedElectricity > 201 && consumedElectricity <= 300) {
      totalElectricityBill =
        priceLevel1 * 50 +
        priceLevel2 * 50 +
        priceLevel3 * 100 +
        priceLevel4 * (consumedElectricity - 200);
    } else if (consumedElectricity > 301 && consumedElectricity <= 400) {
      totalElectricityBill =
        priceLevel1 * 50 +
        priceLevel2 * 50 +
        priceLevel3 * 100 +
        priceLevel4 * 100 +
        priceLevel5 * (consumedElectricity - 300);
    } else {
      totalElectricityBill =
        priceLevel1 * 50 +
        priceLevel2 * 50 +
        priceLevel3 * 100 +
        priceLevel4 * 100 +
        priceLevel5 * 100 +
        priceLevel6 * (consumedElectricity - 400);
    }
    ex02_totalElectricityBill.innerText = `${totalElectricityBill} VNĐ`;
  }
};

// Bài 3
let ex03_intNumber = document.getElementById("ex03_input");
let ex03_btnSubmit = document.getElementById("ex03_btnSubmit");
let ex03_result = document.getElementById("ex03_result");

ex03_btnSubmit.onclick = function calculateExpression() {
  let n = ex03_intNumber.value;
  if (n <= 0) {
    ex03_result.innerText = "Vui lòng nhập số nguyên n > 0";
    return;
  }
  let result = 0;
  for (var i = 1; i <= n; i++) {
    result += i * (i + 1);
  }
  ex03_result.innerText = result;
};

// Bài 4
let ex04_intNumber = document.getElementById("ex04_intNumber");
let ex04_btnSubmit = document.getElementById("ex04_btnSubmit");
let ex04_result = document.getElementById("ex04_result");

ex04_btnSubmit.onclick = function handleCheck() {
  let number = ex04_intNumber.value;
  function checkPrimeNumber(n) {
    let isPrimeNumber = true;
    for (var i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        isPrimeNumber = false;
        break;
      }
    }
    return isPrimeNumber;
  }
  if (number <= 1 || number % 1 !== 0) {
    ex04_result.innerText = "Nhập số nguyên dương lớn hơn 1";
  } else {
    if (checkPrimeNumber(number)) {
      ex04_result.innerText = `${number} là Số nguyên tố `;
    } else {
      ex04_result.innerText = `${number} không là Số nguyên tố `;
    }
  }
};

// Bài 5
let ex05_rowNumber = document.getElementById("ex05_rowNumber");
let ex05_btnSubmit = document.getElementById("ex05_btnSubmit");
let ex05_result = document.getElementById("ex05_result");

ex05_btnSubmit.onclick = function drawTriangle() {
  let rowNumber = ex05_rowNumber.value;
  if (rowNumber <= 0) {
    ex05_result.innerHTML = "Vui lòng nhập 1 số nguyên dương";
    return;
  }
  let count = 0;
  for (var i = 1; i <= rowNumber; i++) {
    let draw = "";
    for (var j = 1; j <= i; j++) {
      count++;
      draw += count + " ";
    }
    ex05_result.innerHTML += `<div>${draw}</div>`;
  }
};

// Bài 6
let ex06_draw = document.getElementById("ex06_draw");
let ex06_result = document.getElementById("ex06_result");

ex06_draw.onclick = function draw() {
  for (let i = 1; i <= 8; i++) {
    let draw = "";
    for (let j = 1; j <= 8; j++) {
      if (i % 2 !== 0) {
        if (j % 2 !== 0) {
          draw += `<div class='square square--white'></div>`;
        } else {
          draw += `<div class='square square--black'></div>`;
        }
      } else {
        if (j % 2 === 0) {
          draw += `<div class='square square--white'></div>`;
        } else {
          draw += `<div class='square square--black'></div>`;
        }
      }
    }
    ex06_result.innerHTML += `<div>${draw}</div>`;
  }
};

// Bài 7
let ex07_multiplicationTableName = document.getElementById(
  "ex07_multiplicationTableName"
);
let ex07_drawMultiplicationTable = document.getElementById(
  "ex07_drawMultiplicationTable"
);
let ex07_result = document.getElementById("ex07_result");

ex07_drawMultiplicationTable.onclick = function draw() {
  let multiplicationTableName = ex07_multiplicationTableName.value;
  ex07_result.innerText = "";
  ex07_result.innerHTML = "";
  if (
    multiplicationTableName <= 0 ||
    multiplicationTableName > 10 ||
    multiplicationTableName % 1 !== 0
  ) {
    ex07_result.innerText =
      "Tên bảng cửu chương muốn vẽ phải là 1 số nguyên từ 1 đến 10";
    return;
  }
  for (let i = 1; i <= 10; i++) {
    let draw = `<div>${multiplicationTableName} x ${i} = ${
      multiplicationTableName * i
    }</div>`;
    ex07_result.innerHTML += draw;
  }
};

// Bài 8
const ex08_input = document.getElementById("ex08_input");
const ex08_btnSubmit = document.getElementById("ex08_btnSubmit");
const ex08_expressionValue = document.getElementById("ex08_expressionValue");

function recursive(n) {
  if (n === 1) {
    return n;
  }
  return recursive(n - 1) + 1 / n;
}

ex08_btnSubmit.onclick = function calculateExpression() {
  let n = ex08_input.value;
  if (n <= 0 || n % 1 !== 0) {
    ex08_expressionValue.innerText = "Vui lòng nhập 1 số nguyên dương";
  } else {
    let result = recursive(n);
    ex08_expressionValue.innerText = result;
  }
};
