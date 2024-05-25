/* 
Câu lệnh rẽ nhánh
- Thực thi các đoạn code dựa vào điều kiện
- 4 trường hợp:
+ Câu lệnh rẽ nhánh thiếu
+ Câu lệnh rẽ nhánh đầy đủ
+ Câu lệnh rẽ nhiều nhánh
+ Câu lệnh rẽ nhánh lồng nhau

Câu lệnh:
- if / else
- switch / case
*/
// var number = 10;
// if (number < 2) {
//   console.log("Số nhỏ hơn 2");
// } else if (number >= 2 && number < 5) {
//   console.log("Số nhỏ hơn 5");
// } else {
//   console.log("Số lớn hơn 5");
// }

// var email = "xphong@gmail.com";
// var password = "phong2003";
// if (!email || !password) {
//   if (!email) {
//     console.log("Vui lòng nhập email");
//   } else {
//     console.log("Vui lòng nhập password");
//   }
// } else {
//   console.log("Thông tin đầy đủ");
// }

// var salary = 500000;
// var tax;
// var income;

// if (salary > 0) {
//   if (salary <= 5000000) {
//     tax = 0;
//   } else if (salary < 15000000) {
//     tax = 0.03;
//   } else {
//     tax = 0.05;
//   }
//   income = (1 - tax) * salary;
//   console.log({ income });
// } else {
//   console.log("Lương không hợp lệ !");
// }

// //
// var action = "create";
// switch (action) {
//   case "create":
//     console.log("Thêm mới");
//     break;
//   case "update":
//   case "edit":
//     console.log("Cập nhật");
//     break;
//   case "delete":
//   case "remove":
//   case "destroy":
//     console.log("Xóa");
//     break;
//   default:
//     console.log("Danh sách");
//     break;
// }

// if (action === "create") {
//   console.log("Thêm mới");
// } else if (action === "update" || action === "edit") {
//   console.log("Cập nhật");
// } else if (action === "delete" || action === "remove" || action === "destroy") {
//   console.log("Xóa");
// } else {
//   console.log("Danh sách");
// }

// Vòng lặp
/**
 * Cú pháp trong lập trình cho phép 1 đoạn chương trình có thể lặp đi lặp lại theo số lần lặp nhất định
 * 2 loại vòng lặp
 * + Biết trước số lần lặp : For
 * + Không bt trước số lần lặp: While / Do While
 * Lưu ý: Các vòng lặp áp dụng riêng cho các kiểu dữ liệu ==> Học sau
 *
 * Vòng lặp for:
 *
 * for(giatrikhoitao; dieukiendung; buocnhay) {
 *
 * }
 */
// Bài tập: Tính gt biểu thức sau total: 1+ 2 + 3 + ... + n;
// var n = 5;
// var result = 0;
// var factorial = 1;
// for (var i = 1; i <= n; i++) {
//   var result2 = 1;
//   for (var j = 1; j <= i; j++) {
//     result2 *= j;
//   }
//   result1 += result2;
//   factorial = factorial * i;
//   result += factorial;
// }

// console.log(result);

// function recursive(n) {
//   if (n === 1) {
//     return n;
//   }
//   return recursive(n - 1) + 1 / n;
// }
// console.log(recursive(5));

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

var n = 7;
if (n <= 1 || n % 1 !== 0) {
  console.log("Nhập số nguyên dương lớn hơn 1");
} else {
  if (checkPrimeNumber(n)) {
    console.log(`${n} là Số nguyên tố `);
  } else {
    console.log(`${n} không là Số nguyên tố `);
  }
}
