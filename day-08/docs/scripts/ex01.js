// Object: Đối tượng, mô tả thông tin cụ thể của đối tượng
/*
- Thuộc tính: Đặc điểm của đối tượng (biến)
- Phương thức: Hành động của đối tượng (hàm)

- 2 cách để tạo object:
+ object literal: tạo object từ function object hoặc dùng ký hiệu {}
+ function constructor
*/

// var user = {
//   name: "Xuân Phong",
//   email: "xuanphong.dev@gmail.com",
//   getName: function () {
//     return "Xuân Phong";
//   },
//   profile: {
//     age: 32,
//     address: "Hà Nội",
//     "shipping-address": "Sài gòn",
//   },
// };

// user.course = "Fullstack F8";
// delete user.getName;
// console.log(user);
// console.log(user.name);
// console.log(user.profile["shipping-address"]);

// Duyệt các key của object
// for (var key in user) {
//   console.log(user[key]);
// }

// Nối 2 object (không dùng hàm có sẵn)
// const obj1 = {
//   name: "hoang an",
//   email: "hoangan@gmail.com",
// };
// const obj2 = {
//   age: 42,
//   role: "teacher",
// };
// const obj3 = {};
// for (var key in obj1) {
//   obj3[key] = obj1[key];
// }
// for (var key in obj2) {
//   obj3[key] = obj2[key];
// }
// console.log(obj3);
