// Bài 1 -> Chuyển họ và tên viết sai thành viết đúng quy tắc
var fullname = "tạ    hoàng     an    ";
fullname = fullname.trim();
// output = Tạ Hoàng An
// Không dùng mảng
fullname = fullname.charAt(0).toUpperCase() + fullname.slice(1);
for (let i = 0; i < fullname.length; i++) {
  var char = fullname.charAt(i);
  var charNext = fullname.charAt(i + 1);
  if (char === " ") {
    if (char === " " && charNext !== " ") {
      var index = i + 1;
      fullname =
        fullname.slice(0, index).trim() +
        " " +
        fullname.charAt(index).toUpperCase() +
        fullname.slice(index + 1);
    }
  }
}

console.log(fullname);
