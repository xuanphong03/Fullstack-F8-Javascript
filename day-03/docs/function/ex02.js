var a = 10;
var getA = function () {
  console.log("Get A");
};
// console.log(a);
// getA();

// Thuộc object là window

// Mọi thứ được tạo ra trong JS đều nằm trong window (Chỉ áp dụng với Client)
// Cú pháp truy cập: tenObject.tenHam() hoặc tenObject.tenBien

// Hàm con
// function display() {
//   function showUser() {
//     console.log("Nguyễn Xuân Phong");
//   }

//   showUser();
// }
// display();

/**
 * Định nghĩa 1 hàm bên trong 1 hàm khác, có thể:
 * - Chỉ có thể gọi hàm đó bên trong hàm khác (Closure)
 * - Được phép sử dụng: Biến toàn cục
 * - Tham số của hàm cha
 * - Biến cục bộ của hàm cha
 * - Tham số của chính nó
 * ===> Được đóng gói bên trong hàm khác
 */
function display() {
  function showUser() {
    console.log("Nguyễn Xuân Phong");
  }

  return showUser;
}
//   ===> Chủ động gọi hàm còn ở bên ngoài phạm vi
// Định nghĩa 1 Func return 1 Func ===> Thunk function
// var showUser = display();
// showUser();

// var sum = function (a) {
//   return function (b) {
//     return a + b;
//   };
// };
// // Tạo hàm con
// var result = sum(5);

// // Gọi hàm con
// result(10);
// console.log(result(10));

// IIFE
(function () {
  console.log("Học JS quá khó... So difficult");
})();

// Giải thuật đệ quy - Thường sử dụng cho dạng bài toán Đa cấp
// function showNumber(n) {
//   console.log(n);
//   if (n > 1) {
//     return showNumber(n - 1) + n;
//   }
// }
// showNumber(10);
// S = 1 + 2 + 3 + ... + n
// function getTotal(n) {
//   if (n === 1) {
//     return 1;
//   }
//   return getTotal(n - 1) + n;
// }
// console.log(getTotal(10));

// function fibonacci(n) {
//   if (n === 1 || n === 2) {
//     return 1;
//   }
//   return fibonacci(n - 1) + fibonacci(n - 2);
// }
// console.log(fibonacci(10));
