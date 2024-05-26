// Bài 03
let ex03_number = document.getElementById("ex03_number");
let ex03_btnSubmit = document.getElementById("ex03_btnSubmit");
let ex03_result = document.getElementById("ex03_result");

ex03_btnSubmit.onclick = function convert() {
  let numberInt = parseInt(ex03_number.value);
  let numberString = "";

  if (numberInt >= 0 && numberInt <= 9999) {
    let thousands = [
      "",
      "một nghìn",
      "hai nghìn",
      "ba nghìn",
      "bốn nghìn",
      "năm nghìn",
      "sáu nghìn",
      "bảy nghìn",
      "tám nghìn",
      "chín nghìn",
    ];
    let hundreds = [
      "",
      "một trăm",
      "hai trăm",
      "ba trăm",
      "bốn trăm",
      "năm trăm",
      "sáu trăm",
      "bảy trăm",
      "tám trăm",
      "chín trăm",
    ];
    let dozens = [
      "",
      "mười",
      "hai mươi",
      "ba mươi",
      "bốn mươi",
      "năm mươi",
      "sáu mươi",
      "bảy mươi",
      "tám mươi",
      "chín mươi",
    ];
    let units = [
      "",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
    ];

    let numberThousand = Math.floor(numberInt / 1000);
    let numberHundred = Math.floor((numberInt % 1000) / 100);
    let numberDozen = Math.floor((numberInt % 100) / 10);
    let numberUnit = numberInt % 10;

    if (numberInt === 0) {
      ex03_result.innerText = "Không";
      return;
    } else {
      if (numberThousand > 0) {
        numberString += thousands[numberThousand] + " ";
      }
      if (numberHundred > 0) {
        numberString += hundreds[numberHundred] + " ";
      } else if (numberThousand > 0 && (numberDozen > 0 || numberUnit > 0)) {
        numberString += "không trăm ";
      }

      if (numberDozen > 0) {
        numberString += dozens[numberDozen] + " ";
      } else if (numberHundred > 0 && numberUnit > 0) {
        numberString += "lẻ ";
      }

      if (numberUnit > 0) {
        numberString += units[numberUnit] + " ";
      }
      ex03_result.innerText = numberString;
    }
  } else {
    ex03_result.innerText = "Vui lòng nhập số bắt đầu từ 0 đến 9999";
  }
};
