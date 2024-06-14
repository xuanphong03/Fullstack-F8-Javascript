// var user = {
//   name: "Hoàng An",
//   email: "hoangan.web@gmail.com",
//   age: 32,
// };
// Object.keys() => Trả về 1 array chứa các key của object

// kiểm tra 1 object có empty hay không?
// function isEmpty(user) {
//   return Object.keys(user).length === 0;
// }
// console.log(isEmpty(user));

// Object.values() => Trả về 1 mảng chứa các value của object
// console.log("Object.values(): ", Object.values(user));

// Object.entries() => Trả về 1 mảng 2 chiều chứa cả key và value
// console.log("Object.entries(): ", Object.entries(user));

// Object.fromEntries() => Trả về 1 object từ 1 mảng 2 chiều
// var arr = [
//   ["name", "Xuân Phong"],
//   ["email", "xuanphong@gmail.com"],
//   ["age", "21"],
// ];

// console.log("Object.fromEntries(): ", Object.fromEntries(arr));

// Bài tập
// var query = {
//   category: 1,
//   keyword: "Khóa học Fullstack",
//   status: true,
// };
// var url = "";

// var keys = Object.keys(query);
// console.log(keys);
// for (var key in query) {
//   if (typeof query[key] === "string") {
//     query[key] = query[key].replaceAll(" ", "+");
//   }
// }

// Object.entries(query).forEach(function (x, index) {
//   url += `${x.join("=")}`;
//   if (index < Object.entries(query).length - 1) {
//     url += "&";
//   }
// });
// console.log(url);

// var queryString = Object.entries(query)
//   .map((queryItem) => queryItem.join("="))
//   .join("&")
//   .replaceAll(" ", "+");

// console.log(queryString);
// // var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// var boolean = ["true", "false"];

// var query2 = Object.fromEntries(
//   queryString.split("&").map((queryItem) => {
//     return queryItem.replaceAll("+", " ").split("=");
//   })
// );

// for (var key in query2) {
//   if (!isNaN(+query2[key])) {
//     query2[key] = +query2[key];
//   }
//   if (boolean.includes(query2[key])) {
//     query2[key] = query2[key] === "true";
//   }
// }
// console.log(query2);

// Object.assign(target, source1, source2,...) => Nối các source vào target (Thay đổi object ban đầu)
// Target sẽ bị ảnh hưởng sau khi nối => muốn không bị ảnh hưởng thay target thành {} và chuyển target sang src
// var user = {
//   name: "Hoàng An",
//   email: "hoangan.web@gmail.com",
// };
// var course = {
//   courseName: "Fullstack",
//   coursePrice: 1200,
// };

// var result = Object.assign({}, user, course);
// console.log(result);
// console.log(user);
