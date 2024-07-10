// Dom Nodes

// HTML ==> DOM Tree ==> Tạo Nodes

// JS ==> Tạo Nodes ==> Update DOM Tree

// Tạo element node
// var root = document.querySelector("#root");
// var h1 = document.createElement("h1");
// h1.classList.add("title");
// h1.innerText = "Học JS không khó";

// var btn = document.createElement("button");
// btn.innerText = "Click me";
// Thêm node vào cây DOM
// root.append(h1);
// root.prepend(btn);

// append: đẩy xuống dưới
// prepend: đẩy lên trên
// 1 node khi update vào cây DOM thì sẽ không dùng lại được nữa

/**
 Bài tập:
    <ul class="menu">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
    </ul>
    <button>Add</button>
    - Thêm đoạn HTML dưới đây vào sau nút click me
    - Khi click vào nút add ta thêm li mới tự động tăng số thứ tự
 */

var root = document.querySelector("#root");
var btn = document.querySelector("button");
var count = 4;

var menu = document.createElement("ul");
for (var i = 0; i < count; i++) {
  var menuItem = document.createElement("li");
  menuItem.innerText = `Item ${i + 1}`;
  menu.append(menuItem);
}
root.append(menu);

var addBtn = document.createElement("button");
addBtn.innerText = "Add";
root.append(addBtn);

addBtn.addEventListener("click", function () {
  var menuItem = document.createElement("li");
  menuItem.innerText = `Item ${++count}`;
  menu.append(menuItem);
});
