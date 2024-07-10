// var root = document.querySelector("#root");
// var h1 = document.createElement("h1");
// var plusBtn = document.createElement("button");
// var countNumberNode = document.createTextNode(0);
// // var span = document.createElement("span");
// // span.innerText = 0;

// h1.innerText = `Count: `;
// plusBtn.innerText = "+";
// root.append(h1);
// root.append(plusBtn);
// // h1.append(span);
// h1.append(countNumberNode);

// plusBtn.addEventListener("click", function () {
//   //   span.innerText++;
//   //   countNumberNode.data++;
//   //   if (countNumberNode.data >= 10) {
//   //     countNumberNode.remove();
//   //   }
// });

// // Comment Node
// var comment = document.createComment("Đây là comment demo");
// document.body.append(comment);

// console.log(document.body.childNodes);

// var commentList = Array.from(document.body.childNodes).filter(
//   (node) => node.nodeName === "#comment"
// );
// console.log(commentList);

// // Clone node ==> Sao chép 1 node
// var h1 = document.createElement("h1");
// h1.innerText = "Hello World";
// root.append(h1);

// for (var i = 0; i < 10; i++) {
//   var h1 = h1.cloneNode(true);
//   root.append(h1);
// }

var root = document.querySelector("#root");
var ul = document.createElement("ul");
var li = document.createElement("li");
var input = document.createElement("input");
input.placeholder = "Name...";

input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    var name = e.target.value;
    var todoItem = li.cloneNode(true);

    todoItem.innerHTML = `${name
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")}`;

    ul.append(todoItem);
    e.target.value = "";
  }
});

root.append(ul);
root.append(input);
