// Insert vào trước một element khác

var root = document.querySelector("#root");
var btn = document.querySelector("button");
var count = 4;

var h1 = document.createElement("h1");
h1.classList.add("title");
h1.innerText = "Học JS không khó";
root.append(h1);

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
  //   var menuItem = document.createElement("li");
  //   menuItem.innerText = `Item ${++count}`;
  //   menu.append(menuItem);
  var h2 = document.createElement("h2");
  h2.innerText = "Hello world";

  //Chèn trước
  //   root.insertBefore(h2, menu);

  //   Chèn sau
  //   if (menu.nextElementSibling) {
  //     root.insertBefore(h2, menu.nextElementSibling);
  //   }

  //   root.replaceChild(h2, h1);
  //   root.append(h1 );
  root.removeChild(h1);
});
