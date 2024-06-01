console.log(String.prototype);
let str = "Học lập trình không khó F8 tại F8";

// 1. length: Lấy độ dài của chuỗi
console.log(str.length);

// 2. charAt(index): Lấy ký tự theo index
// console.log(str.charAt(0));
console.log(str[0]);

// 3. charCodeAt(index): Lấy ký tự theo index và chuyển về mã ASCII
console.log(str.charCodeAt(0));

// 4. concat(): Nối chuỗi
console.log(str.concat(" F8"));

// 5. includes(substring): Kiểm tra chuỗi substring có ở trong chuỗi cha hay không? Nếu có trả về True . Nếu không trả về False
console.log(str.includes("khó"));

// 6. indexOf(substring): Kiểm tra chuỗi substring có ở trong chuỗi cha hay không? Nếu có trả về index đầu tiên tìm được.
// không có trả về -1
console.log(str.indexOf("Học"));

// 7.  lastIndexOf(substring): Kiểm tra chuỗi substring có ở trong chuỗi cha hay không? Nếu có trả về index cuối cùng tìm được.
// không có trả về -1
console.log(str.lastIndexOf("không"));

// 8. slice(start, end): cắt chuỗi từ vị trí start đến vị trí end-1
console.log(str.slice(5, 10));
console.log(str.slice(5));
console.log(str.slice(-5));

// 9. replace(str1, str2): thay thế chuỗi str1 = str2 (chỉ thay thế chuỗi đầu tiên)
console.log(str.replace("F8", "F88"));

// 10. replaceAll(str1, str2): thay thế tất cả
console.log(str.replaceAll("F8", "F88"));

// 11. repeat(): Lặp chuỗi theo số lần xác định
console.log(str.repeat(5));

// 12. split(): tách chuỗi thành mảng
console.log(str.split(" "));

// 13. toUppercase(): Chuyển thành chữ hoa
console.log(str.toUpperCase());
// 14. toLowerCase(): Chuyển thành chữ thường
console.log(str.toLowerCase());
// 15. trim(): Xóa khoảng trắng đầu và cuối chuỗi
var str1 = "     Xuân phong     ";
console.log(str1);
console.log(str1.trim());

// 16. trimStart()
// 17. trimEnd()
// 18. startWith(substring): Kiểm tra chuỗi substring có ở đầu chuỗi không
var path = "/khoa-hoc/fullstack";
console.log(path.startsWith("/khoa-hoc"));
// 19. endWith(substring): Kiểm tra chuỗi substring có ở cuối chuỗi không
var path = "/khoa-hoc/fullstack";
console.log(path.endsWith("/fullstack"));
// 20. match(pattern): Cắt chuỗi dựa vào biểu thức chính quy (Regex)
var str2 =
  "Hello anh em, so dien thoai cua toi: 0987654321 va so tiep theo: 0123456789";
var pattern = /(0|\+84)\d{9}/g;
console.log(str2.match(pattern));

// Bài tập
