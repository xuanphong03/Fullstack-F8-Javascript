// Constructor
/*
- Xây dựng object user
+ name
+ email
+ phone
+ password
+ login()
- Xây dựng object partner
+ name
+ email
+ phone
+ password
+ login()

==> Cấu trúc của object giống nhau
==> Giải pháp: Tạo ra 1 bản thiết kế ===> Tạo các object từ bản thiêt kế đó
*/

// Sử dụng quy tắc đặt tên PascalCase
// Sử dụng danh từ
function User(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.getInfo = function () {
    return `Name: ${this.name}, Email: ${this.email},  Password: ${this.password}`;
  };
}

// var product = {
//   name: "San pham 1",
// };

// Kiểm tra 1 object thuộc Constructor nào
// console.log(user.constructor.name);
// if (
//   product !== null &&
//   product !== undefined &&
//   product.constructor.name === "Object"
// ) {
//   console.log(product.constructor.name);
// }

// Class/Constructor ==> Object ==> Instance
// if (user instanceof User) {
//   console.log("Constructor User");
// }

// Phương thức tĩnh, thuộc tính tĩnh (static property, static method)
// ==> Không phụ thuộc vào object hoặc instance
// ==> Phụ thuộc: Constructor, truy cập được trực tiếp từ constructor. Ví dụ: Array.isArray()
// User.getMessage = function () {
//   return "Học lập trình quá khó";
// };
// console.log(User.message);
// // console.log(User.getMessage());
// console.log(Math.PI);

// User.message = "Hello world";
// var user = new User("Phong", "ngxphong03@gmail.com", "123456");
// User.prototype.getMessage = function () {
//   // Đọc giá trị thuộc tĩnh static message
//   return this.constructor.message;
// };
// console.log(user.getMessage());

// User.prototype.hello = "Xin chào các bạn";
// User.getMessage = function () {
//   // Đọc giá trị thuộc tĩnh static message
//   return this;
// };
// console.log(user.prototype.getMessage());

// var user = new User("Phong", "ngxphong03@gmail.com", "123456");
// User.message = 'Hello world'
// User.getMessage = function () {
//     var obj = new this();
//     console.log(obj.a);
//     return 'Hello'
// }

// User.prototype.getMessage() = function() {
//     // Đọc giá trị từ thuộc tính static msg
//     console.log(this.constructor.message);
// }
// User.prototype.a = 'Xin chào các bạn' // non-static
// console.log(user.getMessage());'

function Person() {
  this.data = ["Item 1", "Item 2", "Item 3"];
}
Object.defineProperties(Person.prototype, {
  lastest: {
    get: function () {
      return this.data[this.data.length - 1];
    },
    set: function (value) {
      this.data.push(value);
    },
  },
});
var person = new Person();
console.log(person.lastest); // trả về phần tử mảng cuối của thuộc tính data
person.lastest = "Item 4";
console.log(person.data);
