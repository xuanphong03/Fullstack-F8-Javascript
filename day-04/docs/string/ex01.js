/**
 * Chuỗi là tập hợp các ký tự
 */
var fullname = "Michael Nguyen";
console.log(fullname);

// Kiểm tra kiểu dữ liệu chuỗi
if (typeof fullname === "string") {
  console.log("Đây là kiểu chuỗi");
}

// Ép kiểu dữ liệu khác về chuỗi
var number = 20;
number = String(20);
console.log(typeof number);
