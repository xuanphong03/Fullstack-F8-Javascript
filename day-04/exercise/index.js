var content =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit cumque eaque itaque debitis quae repellat iusto exercitationem ab ullam Similique vel aliquam aliquid quidem dolores neque nulla";
var arrContent = content.split(" ");
console.log(arrContent);
let position;
let keyword;
let indexCurrentWord = 0;
let indexCurrentHighlight = 0;
setInterval(function () {
  keyword = arrContent[indexCurrentWord];
  let regex = new RegExp(`\\b${keyword}\\b`); // Tạo biểu thức chính quy để tìm từ khóa là một từ riêng biệt
  let match = content.match(regex); // Tìm kiếm từ khóa trong nội dung

  if (match) {
    position = match.index;
    let newContent =
      content.slice(0, position) +
      `<span>${content.slice(position, position + keyword.length)}</span>` +
      content.slice(position + keyword.length);
    document.body.innerHTML = newContent;
  }
  if (indexCurrentWord < arrContent.length - 1) {
    indexCurrentWord++;
  } else {
    indexCurrentWord = 0;
  }
}, 500);
