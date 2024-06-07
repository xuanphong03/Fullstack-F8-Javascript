var users = ["User 1", "User 2", "User 3", "User 4"];

// 1. at(index): trả về phần tử theo index
// 2. concat(): nối nhiều mảng thành 1 mảng
// var arr1 = ["A", "B", "C"];
// var arr2 = [1, 2, 3];
// console.log(arr1.concat(arr2));

// 3. fill() ==> cập nhật tất cả các phần tử của mảng thành 1 giá trị

// 4. includes() ==> Kiểm tra 1 phần tử có nằm trong 1 mảng hay không?
// console.log(users.includes("User 2"));

// 5. indexOf() ==> Kiểm tra 1 phần tử có nằm trong 1 mảng không? ==> Trả về index
// console.log(users.indexOf("User 2"));

// 6. lastIndexOf() ==> Kiểm tra 1 phần tử có nằm trong 1 mảng không? ==> Trả về index cuối cùng

// 7. slice(start, end): Cắt mảng từ start đến end-1
// console.log(users.slice(1, 3));
// console.log(users.slice(1));
// console.log(users.slice(-2));

// 8. join(str) ==> Nối mảng thành chuỗi
// console.log(users.join(" - "));

// 9. sort() ==> Sắp xếp mảng theo thứ tự tăng dần (sắp xếp kí tự, thay đổi mảng ban đầu)
/**
 * sort(function(a,b) {
 *  a: Phần tử sau
 *  b: Phần tử trước
 *  Nếu callback trả về giá trị âm ==> Trả về giá trị a và b
 * })
 */

// var arr = ["An", "Dũng", "Tùng", "Anh"];
// arr.sort();
// console.log(arr);

// var numbers = [1, 100, 10, 2, 8, 9];
// console.log(numbers);
// numbers.sort(function (a, b) {
//   //   if (b > a) {
//   //     return -1;
//   //   }
//   return a - b;
// });
// console.log(numbers);

// var users = [
//   "Tạ Hoàng An",
//   "Đặng Ngọc Sơn",
//   "Lưu Anh Quân",
//   "Lê Đức Nam",
//   "Trung Tuyển",
// ];
// console.log(users);
// // Sắp xếp dsach người dùng trên tăng dần theo tên
// function getName(fullName) {
//   //   var position = fullName.lastIndexOf(" ");
//   //   var firstName = fullName.slice(position);
//   // console.log({ fullName, name: fullName.split(" ").slice(-1).join("") });
//   return fullName.split(" ").slice(-1).join("");
// }
// users.sort(function (user2, user1) {
//   if (getName(user1) > getName(user2)) {
//     return -1;
//   }
// });
// console.log(users);

//
