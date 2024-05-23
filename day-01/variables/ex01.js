// Khai báo biên biến
var userId, customerName, username, userEmail;
var customer;
var customerEmail;

var course = "Fullstack",
  coursePrice = 12000;

//   Hiển thị dữ liệu

// 1. Hiển thị ở tab console
console.log(course);

// 2. Hiển thị lên giao diện trình duyệt

// 2.1. Sử dụng document.write()
// document.write(course);

// 2.2. Sử dụng DOM (Document Object Model)
// document.body.innerHTML = coursePrice;

// Ks hiệu backtick(``) --> Template string
// Lưu ý: Giá trị của biến có thể đưa vào cả 1 chuỗi HTML
var welcome = `<h2>Học ${course} ${coursePrice} không khó</h2>`;
document.write(welcome);

/* 8 kiểu dữ liệu
1. String
2. Number
3. BigInt
4. Boolean
5. Undefined
6. Null
7. Symbol
8. Object

Chia thành 2 nhóm: 
1. Nguyên thủy
    -String
    -Number
    -BigInt
    -Boolean
    -Undefined
    -Null
    -Symbol
2. Tham chiếu
    -Object
*/
