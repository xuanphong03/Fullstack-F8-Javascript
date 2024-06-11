var users = [
  ["User 1", "user1@gmail.com"], // địa chỉ A
  ["User 2", "user2@gmail.com"], // địa chỉ B
  ["User 3", "user3@gmail.com"], // địa chỉ C
];
// Sửa tên của user có email là user2@gmail.com
// users = users.map(function (user, index) {
//   if (user[1] === "user2@gmail.com") {
//     user[0] = "User 2 update";
//   }
//   return user;
// });
// var user = users.find(function (user) {
//   return user[1] === "user2@gmail.com";
// });
// user[0] = "User 2 update";
// console.log(user);

// var a = ["Hoàng An", "hoangan@gmail.com"];
// var b = a;
// sao chép mảng

// shallow copy: Dùng các phương thức sử lý mảng mà trả về mảng mới: slice, map, filter
// var b = a.map((user) => user);
// sử dụng cú pháp spread (ES6)
// var b = [...a];

// deep copy: Chuyển thành định dạng json và sau đó chuyển ngược lại
// var json = JSON.stringify(a);
// var b = JSON.parse(json);
// b[1] = "hoangan2@gmail.com";
// console.log(a);

function test() {
  // arguments: Array-Like Object: 1 object có cấu trúc giống mảng
  // muốn sử dụng các phương thức mảng => ép về kiểu mảng => Array.from()
  console.log(arguments);
  Array.from(arguments).forEach((item) => console.log(item));
}

test(5, 10, 15, 20, 25);

var arr2 = {
  0: 5,
  1: 2,
  2: 3,
  length: 3,
};
console.log(arr2);
Array.from(arr2).forEach((item) => console.log(item));
