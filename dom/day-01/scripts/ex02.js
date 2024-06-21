// JS định nghĩa sẵn các sự kiện tương ứng với các thẻ HTML
// Mỗi thẻ HTML sẽ có những sự kiện riêng
// Việc của Dev: Lắng nghe sự kiện

// var btn = document.querySelector(".btn");
// btn.onclick = function () {
//   console.log("Click me");
// };
// btn.onmouseover = function () {
//   console.log("Di chuột vào");
// };

// btn.onmouseout = function () {
//   console.log("Di chuột ra");
// };

// var username = document.querySelector(".name");
// username.oninput = function () {
//   //   console.log(username.value);
// };
// username.onfocus = function () {
//   console.log("Bạn vừa focus");
// };
// username.onblur = function () {
//   console.log("Bạn vừa blur");
// };
// username.onchange = function () {
//   console.log("Bạn vừa thay đổi");
// };

// Event listener
// var btn = document.querySelector(".btn");
// var btnRemove = document.querySelector(".btn-remove");

// var count = 0;
// var handleClickBtn = function (e) {
//   //   console.log(`Count: `, ++count);
//   console.log("Click me...");
//   console.log(this);
//   console.log(e);
// };

// btn.addEventListener("click", handleClickBtn);

// btnRemove.addEventListener("click", function () {
//   btn.removeEventListener("click", handleClickBtn);
// });

var username = document.querySelector(".name");
username.addEventListener("keyup", function (e) {
  console.log(e);
  console.log(e.target.value);
  if (e.key === "Enter") {
    document.body.style.background = "red";
  }
});
