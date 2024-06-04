// Bài 1 -> Chuyển họ và tên viết sai thành viết đúng quy tắc
var fullName = "tạ    hoàng     an    ";
fullName = fullName.trim();
// output = Tạ Hoàng An
// Không dùng mảng
fullName = fullName.charAt(0).toUpperCase() + fullName.slice(1);
for (let i = 0; i < fullName.length; i++) {
  var char = fullName.charAt(i);
  var charNext = fullName.charAt(i + 1);
  if (char === " ") {
    if (char === " " && charNext !== " ") {
      var index = i + 1;
      fullName =
        fullName.slice(0, index).trim() +
        " " +
        fullName.charAt(index).toUpperCase() +
        fullName.slice(index + 1);
    }
  }
}

console.log(fullName);

// Kiểm tra độ mạnh yếu mật khẩu
/**
 * >= 8 ký tự
 * phải có ít nhất 1 kí tự viết hoa
 * phải có ít nhất 1 kí tự viết thường
 * phải có ít nhất 1 kí tự viết thường
 * phải có ít nhất 1 kí tự viết thường
 */

var password = "Xuanphong@123";
var isLength = false;
var isUpper = false;
var isLower = false;
var isNumber = false;
var isSpecial = false;
if (password.length >= 8) {
  isLength = true;
}
for (let i = 0; i < password.length; i++) {
  let specialCharsList = "!@#$%^&*()";
  let numbersList = "123456789";
  var char = password.charAt(i);
  if (char >= "A" && char <= "Z") {
    isUpper = true;
  }
  if (char >= "a" && char <= "z") {
    isLower = true;
  }
  if (numbersList.includes(char)) {
    isNumber = true;
  }
  if (specialCharsList.includes(char)) {
    isSpecial = true;
  }
}
if (isLength && isLower && isUpper && isSpecial && isNumber) {
  console.log("Mật khẩu mạnh");
} else {
  console.log("Mật khẩu yếu");
}
