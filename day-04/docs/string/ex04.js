var content = `<h1>Học lập trình không khó tại F8 lập trình lập trình</h1>`;
var keyword = "lập trình";
var position = content.toLowerCase().indexOf(keyword.toLowerCase());
var newContent = "";
while (position !== -1) {
  newContent +=
    content.slice(0, position) +
    '<span style="background: yellow;">' +
    content.slice(position, position + keyword.length) +
    "</span>";
  content = content.slice(position + keyword.length);
  position = content.toLowerCase().indexOf(keyword.toLowerCase());
}

newContent = newContent + content;
console.log(newContent);
// }
document.write(newContent);
