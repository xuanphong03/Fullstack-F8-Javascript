var content =
  "Lorem Lorem Lorem Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit cumque eaque itaque et debitis at a quae repellat iusto exercitationem ab ullam Similique vel aliquam aliquid quidem dolores neque nulla";
var keyword = " ";
var startIndex = 0;
var endIndex = content.indexOf(keyword);
var isCurrentLastIndex = false;

setInterval(function () {
  var newContent;
  if (isCurrentLastIndex) {
    newContent =
      content.slice(0, content.lastIndexOf(keyword)) +
      `<span>${content.slice(content.lastIndexOf(keyword))}</span>`;
    startIndex = 0;
    endIndex = content.indexOf(keyword);
    isCurrentLastIndex = false;
  } else {
    isCurrentLastIndex = content.lastIndexOf(keyword) === endIndex;
    newContent =
      content.slice(0, startIndex) +
      `<span>${content.slice(startIndex, endIndex)}</span>` +
      content.slice(endIndex);
    startIndex = endIndex;
    endIndex =
      content.slice(startIndex + 1).indexOf(keyword) + (startIndex + 1);
    console.log(isCurrentLastIndex);
  }

  document.body.innerHTML = newContent;
}, 500);
