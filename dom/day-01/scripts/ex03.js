// DOM HTML: thao tác với thẻ HTML
/*
- Nội dung
- Thuộc tính
- Xóa
- Class
*/

// var contentEl = document.querySelector(".content");

// console.log(contentEl.outerText);
// contentEl.innerHTML = `<h2>Học lập trình không dễ</h2>`;

var result = document.querySelector(".result");
var btnMinus = document.querySelector(".minus-btn");
var btnPlus = document.querySelector(".plus-btn");

var count = 0;
result.innerText = count;

btnMinus.onclick = function () {
  result.innerText = --count;
};
btnPlus.onclick = function () {
  result.innerText = ++count;
};
