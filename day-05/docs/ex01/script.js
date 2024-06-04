// Khai báo mảng
// console.log(users);

// 1. Kiểm tra số lượng phần tự
// console.log(users.length);

// 2. Kiểm tra 1 biến có phải mảng hay không
// console.log(Array.isArray(users));

// 3. Thêm phần tử vào cuối mảng
// users.push("User 6");
// users[users.length] = "User 6";
// console.log(users);

// 4. Lấy giá trị phần từ
// console.log(users[2]);

// 5. Sửa giá trị phần từ
// users[2] = "Updated user";
// console.log(users);

// 6. Duyệt mảng (Lặp qua từng phần tử của mảng)
// for (let i = 0; i < users.length; i++) {
//   console.log(users[i]);
// }
// for (var index in users) {
//   console.log(users[index]);
// }
// for (var user of users) {
//   console.log(user);
// }

// 7. Xóa mảng: Tạo ra một mảng mới không có phần tử đã xóa
// var indexDelete = 2;
// var newUsers = [];
// for (var index in users) {
//   if (+index !== indexDelete) {
//     newUsers[newUsers.length] = users[index];
//   }
// }
// console.log(newUsers);
// var newValue = "User 0";
// var newUser = [newValue];
// for (var index in users) {
//   newUser[newUser.length] = users[+index];
// }
// console.log(newUser);

// var users = [
//   "Tạ Hoàng An",
//   "Nguyễn Tuấn Anh",
//   "Nguyễn Văn Dũng",
//   "Phạm Văn Hiếu",
// ];

// var keyword = "an";

// var newUsers = [];
// for (var index in users) {
//   var user = users[+index].toLowerCase();
//   keyword = keyword.toLowerCase();
//   if (!user.includes(keyword)) {
//     newUsers[newUsers.length] = users[+index];
//   }
// }

// console.log(newUsers);

// var numbers = [5, 2, 1, 9, 6];
// var maxIndex = 0;
// for (let i = 1; i < numbers.length; i++) {
//   if (numbers[maxIndex] < numbers[i]) {
//     maxIndex = i;
//   }
// }
// var temp = numbers[maxIndex];
// numbers[maxIndex] = numbers[0];
// numbers[0] = temp;

// console.log(numbers);

console.log(Array.prototype);

// 1. at(index): trả về phần tử theo index
// 2. concat(): nối nhiều mảng thành 1 mảng
var arr1 = ["A", "B", "C"];
var arr2 = [1, 2, 3];
console.log(arr1.concat(arr2));

// 3. fill() ==> cập nhật tất cả các phần tử của mảng thành 1 giá trị
