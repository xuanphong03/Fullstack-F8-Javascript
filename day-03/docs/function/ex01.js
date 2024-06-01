/**
 * Hàm (Function)
 * - Cú pháp trong lập trình dùng để thể hiện các chúc năng (động từ)
 * - Nhóm các đoạn chương trình còn để dễ dàng gọi lại => Tái sử dụng
 * - Hàm trong JS có 2 loại:
 *  + Hàm tự định nghĩa bởi lập trình viên.
 *  + Hàm có sẵn (Trình duyệt, Engine)
 *
 * Cú pháp định nghĩa Hàm:
 * function tenHam(){
 *  Nội dung hàm
 * }
 *
 * function tenHam(thamso1, thamso2,...) {
 *  Nội dung hàm
 * }
 *
 * Đặt tên Hàm:
 * - Quy tắc camelCase
 * - Sử dụng động từ
 *  + get
 *  + set
 *  + make
 *  + build
 *  + call
 *  + create
 *  + insert
 *  + remove
 *
 * Định nghĩa hàm ===> Tham số (parameter)
 * Gọi hàm ===> Đối số (argument)
 *
 *
 * */

// function getMessage(msg, type = "success") {
//   console.log(msg);
//   console.log(type);
//   return "F8";
// }
// getMessage("Học JS không khó", "error"); // Lời gọi hàm chủ động

/**
 * Hàm có giá trị trả về (Hàm return)
 * Hàm không có giá trị trả về (Hàm void)
 *
 *
 * Biến toàn cục (global): Biến được khai báo ở phạm vi ngoài hàm.
 * Biến cục bộ (local): Biến được khai báo ở phạm vi trong 1 hàm và chỉ được sử dụng trong phạm vi của hàm đó.
 *
 * Lưu ý: Trong JS không có khái niệm tham chiếu, tham trị.
 */

// var data = "F8";

// function getData() {
//   return data;
// }

// function setDate(value) {
//   data = value;
// }
// setDate("Fullstack");
// var result = getData();

// console.log({ result });

// /**
//  * anonymous function: Hàm không tên, hàm ẩn danh
//  * muốn thực thi:
//  *  Cách 1: Gán vào 1 biến (Expression Function)
//  *  Cach 2: Đưa nó vào 1 hàm khác dưới dạng đối số
//  *
//  *  */

// // Bắt buộc phải định nghĩa trước
// // Hoisting của biến chỉ đẩy phần tên biến lên trên chứ không đẩy nội dung trong function
// var getMessage = function () {
//   console.log("Học lập trình không khó");
// };
// getMessage();

// var display = function (callback) {
//   //   console.log(callback);
//   if (typeof callback === "function") {
//     callback();
//   }
// };
// var handleDisplay = function (text) {
//   console.log("Học JS để làm gì");
//   console.log(text);
// };
// display(function () {
//   handleDisplay("Message");
// });
// display(() => handleDisplay("Message2"));

// Từ khóa Arguments:
// function max() {
//   console.log(arguments);
// }
// max(0);
// Rest Parameter: Tham số còn lại
// function max(a, b, ...args) {
//   console.log(args);
// }
// max(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

// function display(value1, value2, value3, value4) {
//   console.log("value 1", value1);
//   console.log("value 2", value2);
//   console.log("value 3", value3);
//   console.log("value 4", value4);
// }

// function max(a, b, ...args) {
//   console.log(a, b);
//   //   display(...args); // Spread Operator
//   display.apply(null, args); // ES5
// }
// max(5, 10, 15, 20, 25, 30);

// setTimeout(
//   function (value1, value2) {
//     console.log("Học lập trình không khó");
//     console.log(value1);
//     console.log(value2);
//   },
//   5000,
//   "F8",
//   "F9"
// );
// var count = 0;
// var id = setInterval(function () {
//   console.log(`Học lập trình để làm gì ${++count}`);
//   if (count === 5) {
//     clearInterval(id);
//   }
// }, 2000);

var getA = function (cb) {
  setTimeout(function () {
    console.log("getA");
    if (typeof cb === "function") {
      cb();
      /**
       * (Function () {
       *  getB(getC)
       * })()
       */
    }
  }, 1000);
};
var getB = function (cb) {
  setTimeout(function () {
    console.log("getB");
    if (typeof cb === "function") {
      cb();
    }
  }, 500);
};
var getC = function (cb) {
  setTimeout(function () {
    console.log("getC");
    if (typeof cb === "function") {
      cb();
    }
  }, 1500);
};
var getD = function (cb) {
  setTimeout(function () {
    console.log("getD");
    if (typeof cb === "function") {
      cb();
    }
  }, 2500);
};
getA(function () {
  getB(function () {
    getC(getD);
  });
});
// getB();
// getC();

/**
 * Định nghĩa hàm con (Tạo 1 hàm bên trong 1 hàm)
 * Closure
 * Kỹ thuật Thunk Function
 * IIFE
 * Giải thuật đệ quy
 *
 * Tìm hiểu sau:
 * Async Function
 * Generator Function
 */
