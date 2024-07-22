var itemsListEl = document.querySelector("ul");
var draggableItemEl = itemsListEl.querySelectorAll("li[draggable='true']");
var isDraggingDown;
var offsetY;
var prevClientY;

draggableItemEl.forEach(function (item) {
  var numericalOrder = item.querySelector("span");
  numericalOrder.addEventListener("dragover", function (e) {
    e.stopPropagation();
  });
  // Thêm class dragging cho item được drag
  item.addEventListener("dragstart", function (e) {
    item.classList.add("dragging");
    offsetY = e.offsetY;
    prevClientY = e.clientY;
  });
  // Sau khi drag xong xóa class dragging khỏi item
  item.addEventListener("dragend", function () {
    item.classList.remove("dragging");
    // Sắp xếp lại thứ tự sau khi đã đổi chỗ item
    sortMenu();
  });
  // Xử lý sự kiện drag item
  item.addEventListener("dragover", handleDragItem);
});

function handleDragItem(e) {
  e.preventDefault();
  var currentClientY = e.clientY;
  var draggingItem = document.querySelector(".dragging");

  // Xác định hướng kéo (chỉ khi khoảng cách currentClientY và prevClientY >= 2
  // để tránh khi giữ nguyên chuột mà clientY thay đổi thì sẽ xảy ra hiện tượng
  // giật lag)
  if (prevClientY && Math.abs(currentClientY - prevClientY) >= 2) {
    isDraggingDown = currentClientY > prevClientY;
  }
  prevClientY = currentClientY;

  // Get vật đằng sau vật bị thay đổi vị trí
  var behindSwappedItem = getBehindSwappedItem(
    currentClientY - offsetY,
    isDraggingDown
  );

  // Nếu có item phía sau item được swap thì sẽ chèn vào phía trước đó
  // item đang được drag. Ngược lại (Trường hợp drag xuống cuối),
  // thì sẽ chèn vào cuối danh sách item
  if (behindSwappedItem) {
    itemsListEl.insertBefore(draggingItem, behindSwappedItem);
  } else if (isDraggingDown) {
    itemsListEl.append(draggingItem);
  }
}

// Func: Lấy phần tử đằng sau phần tử được swap
// Nếu kéo lên trên => Lấy phần tử cuối cùng có offsetTop (tính từ điểm cuối) <= vị trí của draggingItem tới top
// Nếu kéo xuống dưới => Lấy phần tử đầu tiên  offsetTop >= vị trí của draggingItem tới top
function getBehindSwappedItem(clientY, isDraggingDown = true) {
  // Query lại tất cả element để tránh khi các element thay đổi vị trí cho nhau
  // nhưng draggableItemEl khai báo trên đầu vẫn giữ nguyên ==> Vị trí các element
  // dù đã được thay đổi nhưng thứ tự element trong NodesList sau khi query chưa đúng
  // VD: Đổi chỗ item 7 cho item 2. Sau đổi item 8 cho item 6(đang ở vị trí 7) thì item 8 lại đổi chỗ cho item 7(đang ở vị trí 2)
  // chứ ko phải đổi chỗ cho item 6(ở vị trí 7)
  var draggableItemEl = itemsListEl.querySelectorAll("li[draggable='true']");
  console.log({ draggableItemEl });
  return isDraggingDown
    ? Array.from(draggableItemEl).find(function (item) {
        return item.offsetTop >= clientY;
      })
    : Array.from(draggableItemEl).findLast(function (item) {
        return item.offsetTop - item.clientHeight <= clientY;
      });
}

// Func: Tự động đánh số thứ tự khi sắp xếp lại
function sortMenu() {
  // Cập nhật lại danh sách các phần tử trong lessons list
  var lessonItemsList = document.querySelectorAll(
    ".lesson-item:not(.lesson-item--module)"
  );
  var lessonModulesList = document.querySelectorAll(".lesson-item--module");
  // Tự động đánh số thứ tự khi sắp xếp lại
  lessonItemsList.forEach(function (lessonItem, index) {
    lessonItem.children[0].innerText = `Bài ${index + 1}: `;
  });
  lessonModulesList.forEach(function (moduleItem, index) {
    moduleItem.children[0].innerText = `Module ${index + 1}: `;
  });
}
