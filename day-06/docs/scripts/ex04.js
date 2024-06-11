// findIndex, findLastIndex
// findIndex: Tìm index đầu tiên dựa vào điều kiện trong callback
// findLastIndex: Tìm index cuối cùng dựa vào điều kiện trong callback
var users = [
  ["User 1", "user1@gmail.com"],
  ["User 2", "user2@gmail.com"],
  ["User 3", "user3@gmail.com"],
  ["User 4", "user4@gmail.com"],
];

// console.log(users);
var position = users.findIndex(function (user, index) {
  return user.includes("user2@gmail.com");
});
// console.log(position);

// reduce(callback, initialValue)
/**
 * callback có 4 tham số:
 * - prevValue
 * - currentValue
 * - index
 * - array
 *
 * initialValue: giá trị khởi tạo
 *
 * Cách hoạt động
 * 1. Không có initialValue (không có tham số thứ 2)
 * - Vòng lặp reduce chạy từ phần tử thứ 2 đến hết
 * - prevValue của lần lặp đầu tiên chính là phần tử đầu của mảng
 * - currentValue là giá trị của từng phần tử của mảng khi lặp
 * - prevValue của lần lặp sau sẽ là return của lần lặp trước
 * - giá trị của hàm reduce là lần lặp cuối cùng của callback
 *
 *
 * 2. Có initial value
 * - Vòng lặp reduce chạy từ phần tử đầu tiên đến hết
 * - prevValue của lần lặp đầu tiên chính là initialValue
 * - currentValue là giá trị của từng phần tử của mảng khi lặp
 * - prevValue của lần lặp sau sẽ là return của lần lặp trước
 * - giá trị của hàm reduce là lần lặp cuối cùng của callback
 */

// var numbers = [2, 9, 5, 1, -5];
// var total = numbers.reduce(function (prevValue, currentValue, index) {
//   return prevValue + currentValue;
// });
// console.log(total);

var numbers = [2, 9, 5, 1, -5];
var max = numbers.reduce(function (prev, current) {
  return prev > current ? prev : current;
});
console.log(max);
