// DOM = Document Object Model
/**
 * Mô hình hóa tài liệu HTML thành các đối tượng
 * Cho phép JS chỉnh sửa HTML trên trang web
 

- Các loại DOM:
+ DOM Document
+ DOM Element
+ DOM HTML
+ DOM CSS
+ DOM Navigation
+ DOM Event
+ DOM Event Listener
+ DOM Nodes
Bổ sung: Custom Element, Web component, Shadow DOM, Custom Event

- DOM Element: Truy xuất đến các thẻ html để trả về object
*/
// var head = document.head;
// console.log(head);
// var title = document.title;
// console.log(title);
// var body = document.body;
// console.log(body);

// Chọn theo id: Chỉ trả về 1 element đầu tiên
// var h2 = document.getElementById("title");
// console.log(h2);

// Chọn theo class: Trả về 1 danh sách các element tìm được
// var h2List = document.getElementsByClassName("title");
// console.log(h2List);

// Chọn theo tag name: Trả về 1 danh sách các element tìm được
// var h2List = document.getElementsByTagName("h2");
// console.log(h2List);

// Chọn theo CSS Selector
// - Dùng querySelector ==> Trả về element đầu tiên tìm được
// - Dùng querySelectorAll ==> Trả về danh sác các element tìm được

// var h2 = document.querySelectorAll("#title");
// console.log(h2);

// var username = document.querySelector(
//   "form[name='login_form'] input[name='username']"
// );
// var username = document.login_form.username;
// console.log(username);
