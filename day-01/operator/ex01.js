// Biểu thức = Toán tử + Toán hạng
//  total = a + b * c

// 1. Toán tử số học
// +, -, *, /, %, **, ++, --

/**
 * 1. Giống nhau
 * - Đều tăng biến a lên 1 đơn vị
 * 2. Khác nhau
 * TH1: a++ giá trị biểu thức sẽ được trả về trước khi biến a được tăng
 * TH2: ++a giá trị biểu thức sẽ được trả về sau khi biến a được tăng
 */
var a = 1;
var b = 1;
// console.log({
//   a: a++,
//   b: ++b,
// });

// Bài tập
var count = 1;
var count2 = 1;

//            1          3      5    3          5
var total = count++ + ++count + 5 + count++ + ++count;
// console.log(total);

var numb1 = count2++;
var numb2 = ++count2;
var numb3 = count2++;
var numb4 = ++count2;
var tol2 = numb1 + numb2 + numb3 + numb4 + 5;
// console.log(tol2);

// 2. Toán tử so sánh
//  > , < , >=, <= ,==, ===, !=, !==
//  => Lưu ý: KQ khi sử dụng toán tử so sánh => Trả về kiểu dữ liệu boolean (true,false)

// == , != so sánh giá trị
// === , !==  so sánh giá trị và dữ liệu

// console.log(1 == true);
// từ từ làm bài
var gt1 = undefined;
var gt2 = null;
var gt2 = gt1 === undefined || gt1 === null ? gt2 : gt1;
console.log(gt1 ?? gt2);
console.log(gt2);

// 7 Falsy và Truthy
/*
Falsy: Trong điều kiện cần phải ép kiểu dữ liệu sang boolean mà trả về false => Falsy

Truthy:
*/
