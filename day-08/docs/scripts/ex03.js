// từ khóa this
// var user = {
//   name: "Hoàng An",
//   email: "hoangan.dev@gmail.com",
//   getName: function () {
//     // var _this = this;
//     return {
//       age: 32,
//       address: "Hà Nội",
//       getEmail: function () {
//         //   console.log(_this.email);
//         // thay đổi context cho hàm getEmail
//         console.log(this.email);
//       },
//     };
//   },
// };
// user.getName().getEmail.bind(user)();

// Object.prototype.combineValue = function () {
//   var result = [];
//   for (var info in this) {
//     if (typeof this[info] !== "function") {
//       result[result.length] = this[info];
//     }
//   }
//   return result;
// };

// var user = {
//   name: "Hoàng An",
//   email: "hoangan.dev@gmail.com",
//   age: 32,
// };
// var product = {
//   name: "SP 1",
//   price: 12000,
// };
// console.log(user.combineValue());
// console.log(product.combineValue());

// Object.prototype.message = "Học JS không dễ";
// var a = "xuanphong2k3@gmail.com";
// console.log(a.message);

// Array.prototype.lastest = function () {
//   return this[this.length - 1];
// };
// var user2 = ["Item 1", "Item 2"];
// console.log(user2.lastest());

// Viết lại vòng lặp map
var users = ["User 1", "User 2", "User 3", "User 4"];

Array.prototype.map2 = function (cb) {
  // Kiểm tra callback có phải là hàm không
  if (typeof cb !== "function") {
    return;
  }
  var newArray = [];
  for (var i = 0; i < this.length; i++) {
    var value = this[i];
    var index = i;
    newArray.push(cb(value, index, this));
  }
  return newArray;
};

var newArray = users.map2(function (user, index) {
  return `<h3>${index} - ${user}</h3>`;
});

console.log(newArray);
