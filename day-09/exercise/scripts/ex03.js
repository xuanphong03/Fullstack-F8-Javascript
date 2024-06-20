var data = [
  {
    id: 1,
    name: "Chuyên mục 1",
    parent: 0,
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    parent: 0,
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    parent: 0,
  },
  {
    id: 4,
    name: "Chuyên mục 2.1",
    parent: 2,
  },
  {
    id: 5,
    name: "Chuyên mục 2.2",
    parent: 2,
  },
  {
    id: 6,
    name: "Chuyên mục 2.3",
    parent: 2,
  },
  {
    id: 7,
    name: "Chuyên mục 3.1",
    parent: 3,
  },
  {
    id: 8,
    name: "Chuyên mục 3.2",
    parent: 3,
  },
  {
    id: 9,
    name: "Chuyên mục 3.3",
    parent: 3,
  },
  {
    id: 10,
    name: "Chuyên mục 2.2.1",
    parent: 5,
  },
  {
    id: 11,
    name: "Chuyên mục 2.2.2",
    parent: 5,
  },
];

function buildTree(arr, parentId = 0) {
  var result = [];
  // Khai báo một mảng mới để tạo cây nested
  for (var item of arr) {
    // Nếu như có parent,
    // check với parentId để xác định cấp con
    if (item.parent === parentId) {
      // Đệ quy để tạo cấp con
      var children = buildTree(arr, item.id);
      if (children.length > 0) {
        // Nếu như tạo được cấp con,
        // đưa vào cấp cha dưới dạng nested
        item.children = children;
      }
      // Xóa key parent cho giống đề bài
      // Truyền item đã tạo nested vào cây nested
      var newItem = { ...item };
      delete newItem.parent;
      result.push(newItem);
    }
  }
  // trả về cây nested đã được tạo xong
  return result;
}

var ex03_input = document.querySelector(".ex03_input");
var ex03_output = document.querySelector(".ex03_output");

ex03_input.innerText = `Input: ${JSON.stringify(data)}`;
ex03_output.innerText = `Output: ${JSON.stringify(buildTree(data))}`;
