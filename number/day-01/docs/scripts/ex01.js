// Kiểu dữ liệu nguyên thủy, thể hiện các giá trị số
// var a = 12;
// console.log(a, typeof a);

// Kiểm tra 1 biến có phải number không
/**
 * typeof = number
 * Không phải NaN (Not a number)
 * không phải infinity
 */

// Ép kiểu:
// Cách 1: Dùng hàm Number
// var a = "12"; // String
// a = Number(a);
// console.log(a, typeof a);
// Cách 2: Dùng hàm parseInt, parseFloat
// var b = "aaa15.5";
// b = parseFloat(b);
// console.log(b, typeof b);

// Tự động ép kiểu: Gặp các toán tử số học (Trừ phép +)
// var a = 10;
// var b = "5";
// console.log(a / b);

// Số NaN ===> Giá trị khi ép kiểu / tính toán thất bại
// var a = NaN;
// if (Number.isNaN(a)) {
//   console.log("Là số NaN");
// }

// Số Infinity ==> Vượt quá khả năng lưu trữ
// var a = 1000 ** 1000;
// console.log(a);

// toFixed(number): Lấy số chữ số phần thập phân và tự động làm tròn
// var price = 123456.785;
// console.log(price.toFixed(2));
// console.log(price.toPrecision(8));
// // Dùng hàm toFixed và toPrecision ==> Trả về chuối

// // toLocaleString() => Định dạng số theo quốc gia/ khu vực
// var price = 120000000000;
// console.log(
//   price.toLocaleString("ja-JP", { style: "currency", currency: "JPY" })
// );

// console.log(Math.random);
