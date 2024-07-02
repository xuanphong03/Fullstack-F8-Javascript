// DOM Navigation
// 1. Chọn thành phần cha: parentElement
// 2. Chọn thành phần con: children (Trả về 1 danh sách các element con)
// 3. Chọn thành phần nằm sau ngang hàng: nextElementSibling
// 4. Chọn thành phần phía trước ngang hàng: previousElementSibling
// 5. Chọn element đầu tiên: firstElementChild
// 6. Chọn element cuối cùng: lastElementChild

// parentNode
// childeNodes
// nextSibling
// previousSibling
// firstChild
// lastChild

// var items = document.querySelectorAll("ul a");

// items.forEach(function (item) {
//   item.addEventListener("click", function (e) {
//     e.preventDefault();
//     // console.log(this);
//     // var li = this.parentElement;
//     // console.log(this.parentElement.children[1].children);
//     // Array.from(this.parentElement.children[1].children).forEach(function (li) {
//     //   console.log(li);
//     // });
//     // console.log(this.nextElementSibling);
//     // console.log(this.previousElementSibling);
//   });
// });

// var lists = document.querySelector(".lists");
// console.log(lists.childNodes);
