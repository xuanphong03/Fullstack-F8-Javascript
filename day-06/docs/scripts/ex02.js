/**
 * Vòng lặp mảng
 * 1. forEach(callback): Lặp từ đầu mảng đến cuối mảng và không dừng được
 */
var users = ["User 1", "User 2", "User 3", "User 4"];
// users.forEach(function (value, index) {
//   console.log(value, index);
// });

/**
 * 2. map(callback):
 * - Duyệt qua từng phần tử của mảng ban đầu.
 * -Trả về một mảng mới có số phần tử bằng số phần tử của mảng ban đầu và giá trị
 *  các phần từ của mảng mới là giá trị của callback (callback return về giá trị gì, lưu vào mảng mới)
 */
// var newUser = users.map((user, index) => {
//   return `${user} - ${index + 1}`;
// });
// console.log(newUser);

/**
 * 3. filter(callback)
 * - Duyệt qua từng phần tử của mảng ban đầu
 * - Trả về 1 mảng mới, giá trị phần tử của mảng mới sẽ là giá trị của mảng ban đầu nếu callback trả về truthy
 */

// var newUsers = users.filter((user, index) => {
//   return user !== "User 2";
// });
// console.log(newUsers);

/**
 * 4. Xóa phần tử trong mảng
 * splice(index, number)
 * - index: Vị trị cần xóa
 * - number: số phần tử muốn xóa kể từ index
 */

// Xóa khách hàng có email là customer2@gmail.com
var customers = [
  ["Customer 1", "customer1@gmail.com", 32],
  ["Customer 2", "customer2@gmail.com", 28],
  ["Customer 3", "customer3@gmail.com", 31],
  ["Customer 4", "customer4@gmail.com", 29],
];
// var newCustomers = customers.filter(function (customer) {
//   return !customer.includes("customer2@gmail.com");
// });
// console.log(newCustomers);

// var customers2 = [
//   ["Customer 1", "customer1@gmail.com", 32],
//   ["Customer 2", "customer2@gmail.com", 28],
//   ["Customer 3", "customer3@gmail.com", 31],
//   ["Customer 4", "customer4@gmail.com", 29],
// ];

// var _customer2 = customers2.map(function (customer) {
//   if (customer.includes("customer2@gmail.com")) {
//     customer[2] += 2;
//   }
//   return customer;
// });
// console.log(_customer2);

// var data = [];
// var addData = function (value, status) {
//   if (status) {
//     if (!data.includes(value)) {
//       data.push(value);
//     }
//   } else {
//     // if (data.includes(value)) {
//     //   var position = data.indexOf(value);
//     //   data.splice(position, 1);
//     // }
//     data = data.filter((dataItem) => dataItem !== value);
//   }
// };

// addData("An", true);
// addData("An", true);
// addData("Quân", true);
// // addData("Quân", false);
// addData("An", false);
// addData("ABC", false);

// console.log(data);

/**
 *
 */
// console.log(
//   users.find((value, index) => {
//     return index >= 1;
//   })
// );
